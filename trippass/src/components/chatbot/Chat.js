import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from "../../config";
import '../../styles/chat.css';
import { IoIosSend } from "react-icons/io";
import botProfileImage from '../../assets/bot1.png'; 

const Chat = () => {
  const { user } = useSelector(state => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [tripInfo, setTripInfo] = useState(null);

  const [currentPage, setCurrentPage] = useState(0); // 페이지네이션을 위한 상태
  const messagesEndRef = useRef(null);


  useEffect(() => {
    const fetchTripInfo = async () => {
      try {
        const tripResponse = await axios.get(`${API_URL}/getMyTrips`, {
          params: { userId: user.userId, tripId: user.mainTrip }
        });

        if (tripResponse.data['result code'] === 200) {
          setTripInfo(tripResponse.data.response[0]);
        } else {
          console.error('Failed to fetch trip data:', tripResponse.data);
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchTripInfo();
  }, [user.userId, user.mainTrip]);

  useEffect(() => {
    const fetchChatData = async () => {
      if (!tripInfo) return;

      try {
        const chatResponse = await axios.get(`${API_URL}/getChatMessages`, {
          params: { userId: user.userId, tripId: user.mainTrip }
        });

        if (chatResponse.data.result_code === 200) {
          setMessages(chatResponse.data.messages);
          scrollToBottom(); // 처음 렌더링 시 맨 아래로 스크롤
        } else if (chatResponse.data.result_code === 404) {
          const welcomeResponse = await axios.get(`${API_URL}/getWelcomeMessage`, {
            params: { userId: user.userId, tripId: user.mainTrip }
          });

          if (welcomeResponse.data.result_code === 200) {
            const welcomeMessage = {
              message: welcomeResponse.data.welcome_message,
              sender: 'bot',
              isSerp: false,
              timestamp: new Date().toISOString()
            };

            setMessages([welcomeMessage]);
            scrollToBottom(); // 처음 렌더링 시 맨 아래로 스크롤
          } else {
            console.error('Failed to fetch welcome message:', welcomeResponse.data.message);
          }
        } else {
          console.error('Failed to fetch chat data:', chatResponse.data);
        }
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchChatData();
  }, [tripInfo, user.userId, user.mainTrip]);

  useEffect(() => {
    scrollToBottom(); // 메시지 변경 시마다 자동 스크롤
  }, [messages]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (newMessage.trim()) {
      const userMessage = { message: newMessage, sender: 'user', isSerp: false, timestamp: new Date().toISOString() };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      setNewMessage('');

      try {
        // 사용자 메시지를 서버에 저장
        await axios.post(`${API_URL}/saveChatMessage`, {
          userId: user.userId,
          tripId: user.mainTrip,
          sender: 'user',
          message: newMessage,
        });

        // 챗봇 API 호출
        const response = await axios.post(`${API_URL}/callOpenAIFunction`, {
          userId: user.userId,
          tripId: user.mainTrip,
          sender: 'user',
          message: newMessage
        });

        if (response.data.result_code === 200) {
          const formatted_results_str = response.data.response;
          const isSerp = response.data.isSerp; // SERP 여부 가져오기
          const serpMessage = { message: formatted_results_str, sender: 'bot', isSerp, timestamp: new Date().toISOString() };
          console.log(isSerp);
          // 상태에 검색 결과 메시지 추가
          setMessages(prevMessages => [...prevMessages, serpMessage]);

          // 검색 결과 메시지를 서버에 저장
          await axios.post(`${API_URL}/saveChatMessage`, {
            userId: user.userId,
            tripId: user.mainTrip,
            sender: 'bot',
            message: formatted_results_str,
            isSerp: isSerp
          });
        } else {
          console.error('Failed to fetch places:', response.data.message);
        }
      } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleButtonClick = async (userQuery) => {
    const userMessage = { message: userQuery, sender: 'user', isSerp: false, timestamp: new Date().toISOString() };

    // 먼저 사용자 메시지를 상태에 추가합니다.
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      // 사용자 메시지를 서버에 저장
      await axios.post(`${API_URL}/saveChatMessage`, {
        userId: user.userId,
        tripId: user.mainTrip,
        sender: 'user',
        message: userQuery
      });

      // 챗봇 API 호출 
      const response = await axios.post(`${API_URL}/callOpenAIFunction`, {
        userId: user.userId,
        tripId: user.mainTrip,
        sender: 'user',
        message: userQuery
      });

      if (response.data.result_code === 200) {
        const formatted_results_str = response.data.response;
        const isSerp = true; // 버튼 클릭 시 무조건 true
        const serpMessage = { message: formatted_results_str, sender: 'bot', isSerp, timestamp: new Date().toISOString() };

        // 상태에 검색 결과 메시지 추가
        setMessages(prevMessages => [...prevMessages, serpMessage]);

        // 검색 결과 메시지를 서버에 저장
        await axios.post(`${API_URL}/saveChatMessage`, {
          userId: user.userId,
          tripId: user.mainTrip,
          sender: 'bot',
          message: formatted_results_str,
          isSerp: isSerp // isSerp 값 전달
        });
      } else {
        console.error('Failed to fetch places:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };


  const handleUserInputButtonClick = async () => {
    const botMessage = "어느 장소를 입력하고 싶으신가요? 정확한 장소명을 입력해주세요.";
    const botChatMessage = { message: botMessage, sender: 'bot', isSerp: false, timestamp: new Date().toISOString() };

    // 봇 메시지를 상태에 추가합니다.
    setMessages(prevMessages => [...prevMessages, botChatMessage]);

    try {
      // 봇 메시지를 서버에 저장
      await axios.post(`${API_URL}/saveChatMessage`, {
        userId: user.userId,
        tripId: user.mainTrip,
        sender: 'bot',
        message: botMessage
      });
    } catch (error) {
      console.error('Error saving bot message:', error);
    }
  };

  const renderMessageWithLineBreaks = (message) => {
    if (typeof message !== 'string') {
      console.error('Invalid message format:', message);
      return null;
    };

  // 줄바꿈(\n)을 기준으로 메시지를 분리
  return message.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};




const renderSerpMessages = (serpMessage) => {
  // 정규식 패턴으로 숫자와 "장소 이름:" 앞에서 분리
  const allLocations = serpMessage.message.split(/(?=\d{1,2}\.\s*장소 이름:)/)
    .filter(location => location.trim() !== '');


  const startIndex = currentPage * 4;
  const endIndex = startIndex + 4;
  const locationsToShow = allLocations.slice(startIndex, endIndex);

  return (
    <div className="chatMessage otherMessage">
      <div className="messageText">
        {locationsToShow.map((location, index) => (
          <div key={index}>{renderMessageWithLineBreaks(location)}</div>
        ))}
        <div className="pagination">
          <button 
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
          >
            이전
          </button>
          <button 
            disabled={endIndex >= allLocations.length}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            다음
          </button>
        </div>
      </div>
      <img
        src={botProfileImage}
        alt="Profile"
        className="profileImage"
      />
    </div>
  );
};


  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });

    }
  };

  return (
    <div className="chatContainer">
      <div className="chatMessages">
        {messages.map((message, index) => {
          if (message.isSerp) {
            return <div key={index}>{renderSerpMessages(message)}</div>;
          } else {
            return (
              <div
                key={index}
                className={`chatMessage ${message.sender === 'user' ? 'myMessage' : 'otherMessage'}`}
              >
                <div className="messageText">{renderMessageWithLineBreaks(message.message)}</div>
                <img
                  src={message.sender === 'user' 
                        ? `data:image/png;base64,${user.profileImage || user.socialProfileImage}` 
                        : botProfileImage}
                  alt="Profile"
                  className="profileImage"
                />
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="buttonRow">
        <button className="chatButton" onClick={() => handleButtonClick(`${tripInfo.city}에서 인기 있는 관광지 알려줘`)}>{tripInfo ? tripInfo.city : ''} 인기 관광지🗼</button>
        <button className="chatButton" onClick={() => handleButtonClick(`${tripInfo.city}에서 인기 있는 식당 알려줘`)}>{tripInfo ? tripInfo.city : ''} 인기 식당 🍽️</button>
        <button className="chatButton" onClick={() => handleButtonClick(`${tripInfo.city}에서 인기 있는 카페 알려줘`)}>{tripInfo ? tripInfo.city : ''} 인기 카페 ☕</button>
        <button className="chatButton" onClick={handleUserInputButtonClick}>🔎 사용자 입력</button>
      </div>
      <div className="messageInputContainer">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="messageInput"
            placeholder="메시지를 입력하세요..."
          />
          <button type="submit" className="sendMessageButton">
            <IoIosSend style={{ verticalAlign: 'middle', fontSize: '1.2em' }} />
          </button>    
        </form>
      </div>
    </div>
  );
};

export default Chat;

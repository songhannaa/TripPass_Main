import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from "../../config";
import '../../styles/chat.css';
import botProfileImage from '../../assets/bot1.png'; 

const Chat = () => {
  const { user } = useSelector(state => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [tripInfo, setTripInfo] = useState(null);

  useEffect(() => {
    const fetchTripInfo = async () => {
      try {
        const tripResponse = await axios.get(`${API_URL}/getMyTrips`, {
          params: { userId: user.userId, tripId: user.mainTrip }
        });

        if (tripResponse.data['result code'] === 200) {
          const tripInfo = tripResponse.data.response[0];
          setTripInfo(tripInfo);
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

        if (chatResponse.data.result_code === 200 && chatResponse.data.messages.length > 0) {
          setMessages(chatResponse.data.messages);
        } else if (chatResponse.data.result_code === 404) {
          const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
          };

          const startDate = formatDate(tripInfo.startDate);
          const endDate = formatDate(tripInfo.endDate);

          const welcomeMessage = {
            message: `안녕하세요, ${startDate}부터 ${endDate}까지 ${tripInfo.city}로 여행을 가시는 ${user.nickname}님!\n${user.nickname}님만의 여행 플랜 만들기를 시작해볼까요?\n제가 관광지, 식당, 카페 등 다양한 장소를 추천해드릴 수 있어요!\n추천 받길 원하시는 곳의 버튼을 눌러주세요.`,
            sender: 'bot'
          };

          await axios.post(`${API_URL}/saveChatMessage`, {
            userId: user.userId,
            tripId: user.mainTrip,
            sender: 'bot',
            message: welcomeMessage.message
          });

          setMessages([welcomeMessage]);
        } else {
          console.error('Failed to fetch chat data:', chatResponse.data);
        }
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchChatData();
  }, [tripInfo, user.userId, user.mainTrip, user.nickname]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage = { message: newMessage, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setNewMessage('');

      try {
        await axios.post(`${API_URL}/saveChatMessage`, {
          userId: user.userId,
          tripId: user.mainTrip,
          sender: 'user',
          message: newMessage
        });

        setTimeout(() => {
          const botResponse = { message: "아직 개발전입니다ㅜㅠ.", sender: "bot" };
          setMessages(prevMessages => [...prevMessages, botResponse]);
        }, 1000);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const renderMessageWithLineBreaks = (message) => {
    return message.split('\n').map((text, index) => (
      <React.Fragment key={index}>
        {text}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="chatContainer">
      <div className="chatMessages">
        {messages.map((message, index) => (
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
        ))}
      </div>
      <div className="buttonRow">
        <button className="chatButton">{tripInfo ? tripInfo.city : ''} 인기 관광지</button>
        <button className="chatButton">{tripInfo ? tripInfo.city : ''} 인기 식당</button>
        <button className="chatButton">{tripInfo ? tripInfo.city : ''} 인기 카페</button>
        <button className="chatButton">사용자 입력</button>
      </div>
      <div className="messageInputContainer">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="messageInput"
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={handleSendMessage} className="sendMessageButton">전송</button>
      </div>
    </div>
  );
};

export default Chat;
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

  useEffect(() => {
    const fetchChatDataAndTripData = async () => {
      try {
        const chatResponse = await axios.get(`${API_URL}/getChatMessages`, {
          params: { userId: user.userId, tripId: user.mainTrip }
        });

        if (chatResponse.data.result_code === 200 && chatResponse.data.messages.length > 0) {
          setMessages(chatResponse.data.messages);
        } else if (chatResponse.data.result_code === 404) {
          const tripResponse = await axios.get(`${API_URL}/getMyTrips`, {
            params: { tripId: user.mainTrip }
          });

          if (tripResponse.data['result code'] === 200) {
            const tripInfo = tripResponse.data.response[0];
            const welcomeMessage = {
              message: `안녕하세요, ${user.nickname}님!${tripInfo.startDate || '시작 날짜'} ~ ${tripInfo.endDate || '종료 날짜'}에 ${tripInfo.city || '도시'}로 여행을 가시는군요! 추천 받길 원하시는 버튼을 눌러주세요.`,
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
            console.error('Failed to fetch trip data:', tripResponse.data);
          }
        } else {
          console.error('Failed to fetch chat data:', chatResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchChatDataAndTripData();
  }, [user.mainTrip, user.userId, user.nickname]);

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

  return (
    <div className="chatContainer">
      <div className="chatMessages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatMessage ${message.sender === 'user' ? 'myMessage' : 'otherMessage'}`}
          >
            <div className="messageText">{message.message}</div>
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
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/chat.css';
import botProfileImage from '../../assets/bot1.png'; 

const Chat = () => {
  const { user } = useSelector(state => state.user);
  const [messages, setMessages] = useState([
    { text: "안녕하세요! 세영이 입니다", sender: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      
      const userMessage = { text: newMessage, sender: user.id };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setNewMessage('');

      
      setTimeout(() => {
        const botResponse = { text: "아직 개발전입니다ㅜㅠ.", sender: "bot" };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000); 
    }
  };

  return (
    <div className="chatContainer">
      <div className="chatMessages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatMessage ${message.sender === user.id ? 'myMessage' : 'otherMessage'}`}
          >
            <div className="messageText">{message.text}</div>
            <img
              src={message.sender === user.id ? `data:image/png;base64,${user.profileImage}` : botProfileImage}
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

// src/components/dashboard/JoinRequestPop.js
import React, { useState, useEffect } from 'react';
import '../../styles/JoinRequestPop.css';

const JoinRequestPop = ({ onClose, onAccept, onReject, request }) => {
  const [personality, setPersonality] = useState([]);

  useEffect(() => {
    if (request && request.personality) {
      setPersonality(Array.isArray(request.personality) ? request.personality : request.personality.split(','));
    }
  }, [request]);

  if (!request) {
    return null;
  }

  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <button className="closeButton" onClick={onClose}>X</button>
        <h2>크루 가입 요청</h2>
        <div className="memberInfo">
          <img src={request.profileImage ? `data:image/jpeg;base64,${request.profileImage}` : 'https://via.placeholder.com/150'} alt="프로필 이미지" />
          <div className="info">
            <p className="name">{request.nickname}</p>
            <p className="details">{request.sex} / {request.birthDate}</p>
          </div>
        </div>
        <div className="personality">
          <h3>회원 성향</h3>
          <ul>
            {personality.map((trait, index) => (
              <li key={index}>{trait}</li>
            ))}
          </ul>
        </div>
        <p>{request.nickname}님이 {request.tripTitle} 크루에 가입 요청을 보냈습니다.</p>
        <div className="actions">
          <button className="acceptButton" onClick={onAccept}>수락</button>
          <button className="rejectButton" onClick={onReject}>거절</button>
        </div>
      </div>
    </div>
  );
};

export default JoinRequestPop;

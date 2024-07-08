import React, { useState, useEffect } from "react";
import profileImg from '../../assets/profile/profile.png';
import moneyImg from '../../assets/profile/money.png';
import foodImg from '../../assets/profile/food.png';
import transportImg from '../../assets/profile/transport.png';
import scheduleImg from '../../assets/profile/schedule.png';
import photoImg from '../../assets/profile/photo.png';
import '../../styles/userpage.css';

const User = () => {
  const [userInfo, setUserInfo] = useState({
    id: 'saryunanismine',
    birthdate: '2001년 3월 2일',
    sex: '여자',
    nickname: 'Naruto'
  });

  const [preferences, setPreferences] = useState([]);
  const [editing, setEditing] = useState(false);

  const allPreferences = [
    { id: 'money1', img: moneyImg, label: '넉넉한 게 최고!\n이왕 가는 거 FLEX' },
    { id: 'money2', img: moneyImg, label: '아낄 수 있으면\n아끼는 걸로' },
    { id: 'food1', img: foodImg, label: '웨이팅도 괜찮아\n검증된 맛집' },
    { id: 'food2', img: foodImg, label: '끌리는 대로~\n아무거나 먹어요' },
    { id: 'transport1', img: transportImg, label: '터벅터벅\n대중교통 + 뚜벅이' },
    { id: 'transport2', img: transportImg, label: '시간 체력 아끼자\n무조건 택시파' },
    { id: 'schedule1', img: scheduleImg, label: '느긋하게 여유롭게\n즐기면서 천천히' },
    { id: 'schedule2', img: scheduleImg, label: '이왕 온 여행\n알차게 돌아다녀요' },
    { id: 'photo1', img: photoImg, label: '눈으로 담자\n대충 흔적만' },
    { id: 'photo2', img: photoImg, label: '남는 건 사진뿐\n인생샷은 필수!' }
  ];

  const handlePreferenceClick = (preferenceId) => {
    setPreferences((prevPreferences) =>
      prevPreferences.includes(preferenceId)
        ? prevPreferences.filter((id) => id !== preferenceId)
        : [...prevPreferences, preferenceId]
    );
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="section-user-info">
        <h3 className="section-title">회원정보</h3>
        <div className="profile-content">
          <div className="profile-image-container">
            <img src={profileImg} alt="Profile" className="profile-image" />
            <h3 className="user-name">{userInfo.nickname}</h3>
          </div>
          <div className="profile-details-container">
            <div className="details-grid">
                <div className="details-label">아이디</div>
                <div className="details-value">{userInfo.id}</div>
                <div className="details-label">비밀번호</div>
                <div className="details-value"><button className="password-button">비밀번호 수정</button></div>
                <div className="details-label">생년월일</div>
                <div className="details-value">{userInfo.birthdate}</div>
                <div className="details-label">성별</div>
                <div className="details-value">{userInfo.sex}</div>
              </div>
          </div>
        </div>
      </div>

      <div className="section-travel-preferences">
        <h3 className="section-title">나의 여행 성향</h3>
        {preferences.length === 0 && !editing && (
          <div className="no-preferences">
            아직 선택하신 내역이 없어요 😣
          </div>
        )}
        {editing ? (
          <div className="preferences-icons">
            {allPreferences.map((preference) => (
              <div
                key={preference.id}
                className={`preference-icon ${preferences.includes(preference.id) ? 'selected' : ''}`}
                onClick={() => handlePreferenceClick(preference.id)}
              >
                <img src={preference.img} alt={preference.label} />
                <p>{preference.label}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="preferences-icons">
            {preferences.map((preferenceId) => {
              const preference = allPreferences.find((p) => p.id === preferenceId);
              return (
                <div key={preference.id} className="preference-icon">
                  <img src={preference.img} alt={preference.label} />
                  <p>{preference.label}</p>
                </div>
              );
            })}
          </div>
        )}
        <button className="edit-button" onClick={editing ? handleSaveClick : handleEditClick}>
          {editing ? '수정 완료' : '결과 수정'}
        </button>
      </div>
    </div>
  );
};

export default User;

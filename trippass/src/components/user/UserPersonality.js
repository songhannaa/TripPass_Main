import React, { useState, useEffect } from "react";
import moneyImg from '../../assets/profile/money.png';
import foodImg from '../../assets/profile/food.png';
import transportImg from '../../assets/profile/transport.png';
import scheduleImg from '../../assets/profile/schedule.png';
import photoImg from '../../assets/profile/photo.png';

const UserPersonality = () => {
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

  const [preferences, setPreferences] = useState([]);
  const [editing, setEditing] = useState(false);

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
    <>
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
    </>
  )
}

export default UserPersonality
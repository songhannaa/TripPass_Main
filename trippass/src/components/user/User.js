import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPencilAlt } from "react-icons/fa";
import Popup from './ProfilePopup';
import { updateProfileImageAsync } from '../../store/userSlice';
import '../../styles/userpage.css';

const User = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleProfileImageSave = (file) => {
    if (file && user) {
      dispatch(updateProfileImageAsync(user.userId, file));
    }
  };

  return (
    <div className="profile-container">
      <div className="section-user-info">
        <div className="section-title">회원정보</div>
        {isAuthenticated && (
          <div className="profile-content">
            <div className="profile-image-container">
              <img src={user.profileImage ? `data:image/jpeg;base64,${user.profileImage}` : null} alt="user profile" className="profile-image" />
              <div className="profile-update" onClick={handlePopupOpen}><FaPencilAlt /></div>
              <div className="user-name">{user.nickname} 님</div>
            </div>
            <div className="profile-details-container">
              <div className="details-grid">
                <div className="details-label">아이디</div>
                <div className="details-value">{user.id}</div>
                <div className="details-label">비밀번호</div>
                <div className="details-value"><button className="password-button">비밀번호 수정</button></div>
                <div className="details-label">생년월일</div>
                <div className="details-value">{user.birthDate}</div>
                <div className="details-label">성별</div>
                <div className="details-value">{user.sex}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showPopup && <Popup onClose={handlePopupClose} onSave={handleProfileImageSave} />}
    </div>
  );
};

export default User;

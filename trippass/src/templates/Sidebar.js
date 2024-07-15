import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import "../styles/layout.css"; 
import bot from "../assets/bot1.png";
import dashboardIcon from "../assets/dashboard.png";
import NewTrip from "../components/dashboard/NewTrip";

const Sidebar = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        <div className="planInsert">
          <div className="botProfile">
            <img src={bot} alt="trippass bot1" />
          </div>
          <div className="planInsertText">
            <div className="description">어디로 여행을 가시나요?</div>
            <div className="planInsertBtn" onClick={handleButtonClick}>
              새로운 여행 계획하기
            </div>
          </div>
        </div>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#F3F5F8' : '',
                padding: isActive ? '' : '',
                borderRadius: isActive ? '13px' : '',
                color: isActive ? '#5F6165' : ''
              })}
            >
              <img src={dashboardIcon} alt="Dashboard Icon" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/MyTrip"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#F3F5F8' : '',
                padding: isActive ? '' : '',
                borderRadius: isActive ? '13px' : '',
                color: isActive ? '#5F6165' : ''
              })}
            >
              <img src={dashboardIcon} alt="Dashboard Icon" />
              MyTrip
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tripCrew"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#F3F5F8' : '',
                padding: isActive ? '' : '',
                borderRadius: isActive ? '13px' : '',
                color: isActive ? '#5F6165' : ''
              })}
            >
              <img src={dashboardIcon} alt="Dashboard Icon" />
              TripCrew
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chat"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#F3F5F8' : '',
                padding: isActive ? '' : '',
                borderRadius: isActive ? '13px' : '',
                color: isActive ? '#5F6165' : ''
              })}
            >
              <img src={dashboardIcon} alt="Dashboard Icon" />
              Chat
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sidebar-user">
        {isAuthenticated && (
          <NavLink
            to="/user"
            style={({ isActive }) => ({
              color: isActive ? '#2c2c2c' : '',
            })}
          >
            <div className="userProfile">
            {user.profileImage ? (
                <img src={`data:image/jpeg;base64,${user.profileImage}`} alt="user profile" className="profile-image" />
              ) : (
                user.socialProfileImage && (
                  <img src={user.socialProfileImage} alt="user profile" className="profile-image" />
                )
              )}
            </div>
            <div className="userName">
              {user.nickname}님
            </div>
          </NavLink>
        )}
      </div>
      {isPopupOpen && <NewTrip onClose={handleClosePopup} />}
    </div>
  );
};

export default Sidebar;

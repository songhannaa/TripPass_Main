import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import "../styles/layout.css"; 
import bot from "../assets/bot1.png";
import dashboardIcon from "../assets/dashboard.png";

const Sidebar = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        <div className="planInsert">
          <div className="botProfile">
            <img src={bot} alt="trippass bot1" />
          </div>
          <div className="planInsertText">
            <div className="description">같이 계획을 만들어요!</div>
            <div className="planInsertBtn">
              챗봇 채팅 시작하기
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
              to="/tripPlan"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#F3F5F8' : '',
                padding: isActive ? '' : '',
                borderRadius: isActive ? '13px' : '',
                color: isActive ? '#5F6165' : ''
              })}
            >
              <img src={dashboardIcon} alt="Dashboard Icon" />
              TripPlan
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
              backgroundColor: isActive ? '#F3F5F8' : '',
              padding: isActive ? '' : '',
              borderRadius: isActive ? '13px' : ''
            })}
          >
            <div className="userProfile">
              <img src={user.profileImage ? `data:image/jpeg;base64,${user.profileImage}` : null} alt="user profile" />
            </div>
            <div className="userName">
              {user.nickname}님
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

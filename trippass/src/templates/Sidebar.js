import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import "../styles/layout.css"; 
import { PiAirplaneTiltBold } from "react-icons/pi";
import { PiAlienBold } from "react-icons/pi";
import { RiRobot2Line } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
const Sidebar = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        <div className="planInsert">
          <div className="planInsertText">
            <div className="description">2024.09.12 - 2024.09.14</div>
            <div className="planInsertBtn">
              바르셀로나 뿌시기 
            </div>
          </div>
        </div>
        <ul>
        <li>
            <NavLink
              to="/myTrip"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#F3F5F8' : '',
                padding: isActive ? '' : '',
                borderRadius: isActive ? '13px' : '',
                color: isActive ? '#5F6165' : ''
              })}
            >
              <PiAirplaneTiltBold size={24}/>&nbsp;
              MY TRIP
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
              <LuCalendarDays size={22}/>&nbsp;
              TRIP PLAN
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
              <PiAlienBold size={24} />&nbsp;
              TRIP CREW
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
              <RiRobot2Line size={24}/>&nbsp;
              CHATBOT
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
    </div>
  );
};

export default Sidebar;
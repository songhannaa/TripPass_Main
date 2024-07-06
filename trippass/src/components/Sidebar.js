import React from "react";
import { Link } from "react-router-dom";
import "../styles/layout.css"; 
import bot from "../assets/bot1.png";
import dashboardIcon from "../assets/dashboard.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
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
          <Link to="/"><img src={dashboardIcon} alt="Da  shboard Icon" />Dashboard</Link>
        </li>
        <li>
          <Link to="/tripPlan"><img src={dashboardIcon} alt="Dashboard Icon" />TripPlan</Link>
        </li>
        <li>
          <Link to="/tripCrew"><img src={dashboardIcon} alt="Dashboard Icon" />TripCrew</Link>
        </li>
        <li>
          <Link to="/chat"><img src={dashboardIcon} alt="Dashboard Icon" />Chat</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/layout.css"; // 스타일 추가

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">챗봇과 함께 여행 만들기</div>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/tripPlan">TripPlan</Link>
        </li>
        <li>
          <Link to="/tripCrew">TripCrew</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

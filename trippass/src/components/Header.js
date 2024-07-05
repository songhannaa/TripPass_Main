import React from "react";
import { Link } from "react-router-dom";
import "../styles/layout.css"; // 스타일 추가

const Header = () => {
  return (
    <div className="header">
      <div className="logo"><Link to="/">TripPass</Link></div>
      <ul className="header-links">
        <li>여행타이틀 드롭다운</li>
        <li>알림</li>
        <li>
          <Link to="/user">마이 페이지</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;

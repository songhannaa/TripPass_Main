import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import "../styles/layout.css"; 
import logo from "../assets/logo.png";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    alert("로그아웃 되었습니다");
    dispatch(logout());
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="logo"><Link to="/"><img src={logo} alt="logo" /></Link></div>
      {isAuthenticated ? (
        <ul className="header-links">
          <li>
            <select className="dropdown">
              <option value="">여행을 선택해 주세요</option>
              <option value="option1">option1</option>
              <option value="option2">option2</option>
              <option value="option3">option3</option>
            </select>
          </li>
          <li><MdOutlineNotificationsNone size={22} /></li>
          <li>
            <button className="logout-button" onClick={handleLogout}><FiLogOut size={18}/></button>
          </li>
        </ul>
      ) : (
        <p>로그인 후 이용 가능합니다.</p>
      )}
    </div>
  );
};

export default Header;

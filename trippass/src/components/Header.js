import React , { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/layout.css"; 
import logo from "../assets/logo.png";
import notification from "../assets/notification.png";
import user from "../assets/user.png";

const Header = () => {
  const [selected, setSelected] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className="header">
      <div className="logo"><Link to="/"><img src={logo} alt="logo" /></Link></div>
      <ul className="header-links">
        <li>
          <select className="dropdown" id="dropdown" value={selected} onChange={handleChange}>
            <option value="">여행을 선택해 주세요</option>
            <option value="option1">option1</option>
            <option value="option2">option2</option>
            <option value="option3">option3</option>
          </select>
        </li>
        <li><img src={notification} alt="notification" /></li>
        <li>
          <Link to="/user"><img src={user} alt="user profile" /></Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;

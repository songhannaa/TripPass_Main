import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import axios from 'axios';
import "../styles/layout.css"; 
import logo from "../assets/logo.png";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { API_URL } from '../config';

const Header = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await axios.get(`${API_URL}/getMyTrips?tripId=${user.mainTrip}`);
        if (response.data['result code'] === 200) {
          const tripData = response.data.response[0];
          const city = tripData.city;

          const weatherResponse = await axios.get(`${API_URL}/getWeather?city=${city}`);
          if (weatherResponse.status === 200) {
            setWeather(weatherResponse.data);
          }
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    if (isAuthenticated && user && user.mainTrip) {
      fetchTripData();
    }
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    alert("로그아웃 되었습니다");
    dispatch(logout());
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="logo"><Link to="/dashboard"><img src={logo} alt="logo" /></Link></div>
      {isAuthenticated ? (
        <ul className="header-links">
          {weather && (
            <li className="weather-info">
              <span>{weather.city}&nbsp;</span>
              <span>{weather.weather}&nbsp;</span>
              <span>{weather.temperature}</span>
            </li>
          )}
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

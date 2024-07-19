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
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

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

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchNotifications = async () => {
        try {
          const response = await axios.get(`${API_URL}/getJoinRequests`, {
            params: { userId: user.userId }
          });
          if (response.data['result code'] === 200) {
            const newNotifications = response.data.response.filter(
              request => request.status === 1 || request.status === 0 // 상태가 1인 경우 수락된 요청과 상태가 0인 경우 새로운 요청
            );
            setNotifications(newNotifications);
          }
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
      fetchNotifications();

      const intervalId = setInterval(fetchNotifications, 60000); // 1분마다 상태 조회
      return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
    }
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    alert("로그아웃 되었습니다");
    dispatch(logout());
    window.location.reload();
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationItemClick = async (crewId, userId) => {
    try {
      // 알림을 확인 상태로 업데이트
      const response = await axios.delete(`${API_URL}/deleteJoinRequest`, {
        params: { crewId, userId }
      });
      if (response.data['result code'] === 200) {
        setNotifications(notifications.filter(notification => notification.crewId !== crewId || notification.userId !== userId));
        alert("알림이 확인되었습니다.");
      } else {
        console.error(response.data.response);
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className="header">
      <div className="logo"><Link to="/tripPlan"><img src={logo} alt="logo" /></Link></div>
      {isAuthenticated ? (
        <ul className="header-links">
          {weather && (
            <li className="weather-info">
              <span style={{ fontWeight: 'bold' }}>{weather.city}&nbsp;&nbsp;</span>
              <span>{weather.temperature}°C&nbsp;</span>
              <img src={`http://openweathermap.org/img/wn/${weather.icon}.png`} alt={weather.weather} />
            </li>
          )}
          <li className="notification-icon-wrapper" onClick={handleNotificationClick}>
            <MdOutlineNotificationsNone size={22} />
            {notifications.length > 0 && (
              <span className="notification-count">{notifications.length}</span>
            )}
            {showNotifications && (
              <div className="notification-popup">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div
                      key={`${notification.crewId}-${notification.userId}`}
                      className="notification-item"
                      onClick={() => handleNotificationItemClick(notification.crewId, notification.userId)}
                    >
                      <p>{notification.status === 0 ? "새로운 가입 요청이 있습니다!" : "크루에 가입되었습니다!"}</p>
                    </div>
                  ))
                ) : (
                  <p>새로운 알림이 없습니다.</p>
                )}
              </div>
            )}
          </li>
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

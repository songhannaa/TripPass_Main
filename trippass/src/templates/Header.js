import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
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
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_URL}/getJoinRequests`, {
          params: { userId: user.userId }
        });
        if (response.data['result code'] === 200) {
          const newNotifications = response.data.response.filter(
            request => request.alert === 0 && (
              (request.status === 0 && request.crewLeader === user.userId) || 
              (request.userId === user.userId && (request.status === 1 || request.status === 2))
            )
          );
          console.log("Notifications: ", newNotifications);  // 로그 추가
          setNotifications(newNotifications);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (isAuthenticated && user) {
      fetchNotifications();
    }

  }, [isAuthenticated, user, location]);

  const handleLogout = () => {
    alert("로그아웃 되었습니다");
    dispatch(logout());
    window.location.reload();
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationItemClick = async (notification) => {
    try {
      await axios.post(`${API_URL}/updateNotificationStatus`, {
        requestId: notification.requestId,
        alert: 1  // 상태를 1으로 업데이트
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      // 알림 상태를 업데이트하여 화면에서 제거
      setNotifications(notifications.filter(n => n.requestId !== notification.requestId));
    } catch (error) {
      console.error('Error updating notification status:', error);
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
                    <div key={notification.requestId} className="notification-item" onClick={() => handleNotificationItemClick(notification)}>
                      <p>
                        {notification.status === 0 && notification.crewLeader === user.userId
                          ? `${notification.crewTitle} 크루 가입 요청이 있습니다.`
                          : notification.status === 1 && notification.userId === user.userId
                          ? `${notification.crewTitle} 크루에 가입되었습니다!`
                          : notification.status === 2 && notification.userId === user.userId
                          ? `${notification.crewTitle} 크루 가입이 거절되었습니다.`
                          : ''}
                      </p>
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

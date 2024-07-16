import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import NewTripCrewPop from './NewTripCrewPop';
import '../../styles/MyCrewList.css';
import { API_URL } from '../../config';

const CrewCard = ({ banner, date, time, title, crewId, userId, tripmate, handleDelete }) => {
  const isOwner = userId === tripmate; // 현재 사용자가 크루의 소유자인지 확인합니다.

  return (
    <div className="crewCard">
      <div className="crewCardImageWrapper">
        <img src={banner} alt="Crew Banner" className="crewCardImage" />
        <div className="crewCardOverlay">
          <h3>{title}</h3>
          <p>{date}</p>
          <p>{time}</p>
          {isOwner && (
            <button className="deleteCrewButton" onClick={() => handleDelete(crewId)}>삭제</button>
          )}
        </div>
      </div>
    </div>
  );
};

const MyCrewList = ({ userId, tripId }) => {
  const [crews, setCrews] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchCrewData = useCallback(async () => {
    if (!tripId) {
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/getMyCrew`, {
        params: { userId, tripId }
      });

      const data = response.data.response.map(crew => {
        const seconds = parseInt(crew.time, 10);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        
        return {
          banner: crew.banner ? `data:image/jpeg;base64,${crew.banner}` : 'https://via.placeholder.com/150',
          date: crew.date,
          time: formattedTime,
          title: crew.title,
          crewId: crew.crewId,
          tripmate: crew.tripmate
        };
      });

      // 날짜 순서로 정렬
      data.sort((a, b) => new Date(a.date) - new Date(b.date));

      setCrews(data);
    } catch (error) {
      console.error('Error fetching crew data:', error);
    }
  }, [userId, tripId]);

  useEffect(() => {
    fetchCrewData();
  }, [userId, tripId, fetchCrewData]);

  const handleSave = (newCrew) => {
    fetchCrewData();
  };

  const handleDelete = async (crewId) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteCrew`, {
        data: {
          crewId,
          userId
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log('Crew deleted successfully');
        fetchCrewData();
      } else {
        console.error('Error deleting crew:', response.data);
      }
    } catch (error) {
      console.error('Error deleting crew:', error);
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="crewSection">
      <h2>마이 크루</h2>
      <div className="sliderContainer">
        <div className="sliderWrapper">
          <div className="slider">
            {crews.map((crew, index) => (
              <CrewCard key={index} {...crew} userId={userId} handleDelete={handleDelete} />
            ))}
            <div className="crewCard createCrewCard" onClick={openPopup}>
              <button className="createCrewButton">+<br />New Crew</button>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <NewTripCrewPop onClose={closePopup} onSave={handleSave} tripId={tripId} userId={userId} />}
    </div>
  );
};

export default MyCrewList;

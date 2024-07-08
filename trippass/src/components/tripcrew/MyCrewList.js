// src/components/tripcrew/MyCrewList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewTripCrewPop from './NewTripCrewPop';
import '../../styles/MyCrewList.css';

/*크루 카드, 안에 들어가는 내용 설정*/
const CrewCard = ({ banner, date, time, title }) => {
  return (
    <div className="crew-card">
      <div className="crew-card-image-wrapper">
        <img src={banner} alt={title} className="crew-card-image" />
        <div className="crew-card-overlay">
          <h3>{title}</h3>
          <p>{date}</p>
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
};

const MyCrewList = ({ userId, tripId }) => {
  const [crews, setCrews] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getCrew`, {
          params: { userId, tripId }
        });
        const data = response.data.response.map(crew => ({
          banner: crew.banner ? `data:image/jpeg;base64,${crew.banner}` : 'https://via.placeholder.com/150',
          date: crew.date,
          time: crew.time
        }));
        setCrews(data);
      } catch (error) {
        console.error('Error fetching crew data:', error);
      }
    };

    fetchCrewData();
  }, [userId], [tripId]);

  const handleSave = (newCrew) => {
    const newCrewData = {
      banner: newCrew.bannerPreview,
      date: newCrew.date,
      time: newCrew.time,
      title: newCrew.crewName,
    };
    setCrews([...crews, newCrewData]);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="crew-section">
      <h2>마이 크루</h2>
      <div className="slider-container">
        <div className="slider-wrapper">
          <div className="slider">
            {crews.map((crew, index) => (
              <CrewCard key={index} {...crew} />
            ))}
            <div className="crew-card create-crew-card" onClick={openPopup}>
              <button className="create-crew-button">+ 새로운 크루 만들기</button>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <NewTripCrewPop onClose={closePopup} onSave={handleSave} />}
    </div>
  );
};

export default MyCrewList;
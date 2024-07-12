import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewTripCrewPop from './NewTripCrewPop';
import '../../styles/MyCrewList.css';
import { API_URL } from '../../config'; // config.js에서 API_URL 가져오기

const CrewCard = ({ banner, date, time, title }) => {
  return (
    <div className="crewCard">
      <div className="crewCardImageWrapper">
        <img src={banner} alt="Crew Banner" className="crewCardImage" />
        <div className="crewCardOverlay">
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
      if (!tripId) {
        return;
      }

      try {
        console.log(`Fetching data for userId: ${userId}, tripId: ${tripId}`);

        const response = await axios.get(`${API_URL}/getMyCrew`, {
          params: { userId, tripId }
        });

        console.log('getMyCrew response:', response);

        const data = response.data.response.map(crew => ({
          banner: crew.banner ? `data:image/jpeg;base64,${crew.banner}` : 'https://via.placeholder.com/150',
          date: crew.date,
          time: crew.time,
          title: crew.title,
        }));

        console.log('Formatted crew data:', data);

        setCrews(data);
      } catch (error) {
        console.error('Error fetching crew data:', error);
      }
    };

    fetchCrewData();
  }, [userId, tripId]);

  const handleSave = (newCrew) => {
    const newCrewData = {
      banner: newCrew.bannerPreview,
      date: newCrew.date,
      time: newCrew.time,
      title: newCrew.crewName,
    };
    setCrews([...crews, newCrewData]);

    const data = new FormData();
    data.append('planId', newCrew.planId);
    data.append('title', newCrew.crewName);
    data.append('contact', newCrew.contact);
    data.append('note', newCrew.note);
    data.append('numOfMate', newCrew.numOfMate);
    if (newCrew.banner) {
      data.append('banner', newCrew.banner);
    }

    axios.post(`${API_URL}/insertCrew`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      if (response.status === 200) {
        console.log('Crew saved successfully');
      } else {
        console.error('Error saving crew:', response.data);
      }
    })
    .catch(error => {
      console.error('Error saving crew:', error);
    });
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
              <CrewCard key={index} {...crew} />
            ))}
            <div className="crewCard createCrewCard" onClick={openPopup}>
              <button className="createCrewButton">+<br />새로운 크루 만들기</button>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <NewTripCrewPop onClose={closePopup} onSave={handleSave} tripId={tripId} />}
    </div>
  );
};

export default MyCrewList;

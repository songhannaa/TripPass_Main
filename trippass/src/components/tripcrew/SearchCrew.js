// src/components/tripcrew/SearchCrew.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/SearchCrew.css';

const SearchCrewCard = ({ image, date, title, location, description }) => {
  return (
    <div className="search-crew-card">
      <img src={image} alt={title} className="search-crew-card-image" />
      <div className="search-crew-card-content">
        <h3>{title}</h3>
        <p className="search-crew-card-date">{date}</p>
        <p className="search-crew-card-location">{location}</p>
        <p className="search-crew-card-description">{description}</p>
      </div>
      <button className="search-crew-card-button">신청하기</button>
    </div>
  );
};

const SearchCrew = ({ userId }) => {
  const [crewData, setCrewData] = useState([]);

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        const response = await axios.get(`${process.env.DB_URL}/getCrewCalc`, {
          params: { userId }
        });
        const data = response.data.response.map(crew => ({
          image: crew.banner ? `data:image/jpeg;base64,${crew.banner}` : 'https://via.placeholder.com/286x172',
          date: `${crew.date} ${crew.time}`,
          title: crew.title,
          location: crew.place,
          description: crew.note,
        }));
        setCrewData(data);
      } catch (error) {
        console.error('Error fetching crew data:', error);
      }
    };

    fetchCrewData();
  }, [userId]);

  return (
    <div className="search-crew">
      <h2>크루 찾기</h2>
      {crewData.length > 0 ? (
        crewData.map((crew, index) => (
          <SearchCrewCard key={index} {...crew} />
        ))
      ) : (
        <p>크루 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default SearchCrew;
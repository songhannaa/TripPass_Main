// src/components/tripcrew/SearchCrew.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/SearchCrew.css';

const SearchCrewCard = ({ banner, date, title }) => {
  return (
    <div className="search-crew-card">
      <img src={banner} alt={title} className="search-crew-card-image" />
      <div className="search-crew-card-content">
        <h3>{title}</h3>
        <p>{date}</p>
      </div>
    </div>
  );
};

const SearchCrew = ({ userId, tripId }) => {
  const [crewData, setCrewData] = useState([]);

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL2}/getCrewCalc`, {
          params: { userId, tripId }
        });

        const data = response.data.response.map(crew => ({
          banner: crew.banner ? `data:image/jpeg;base64,${crew.banner}` : 'https://via.placeholder.com/286x172',
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
  }, [userId, tripId]);

  return (
    <div className="search-crew">
      <h2>크루 찾기</h2>
      {crewData.map((crew, index) => (
        <SearchCrewCard key={index} {...crew} />
      ))}
    </div>
  );
};

export default SearchCrew;

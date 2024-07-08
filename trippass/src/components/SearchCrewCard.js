// src/components/SearchCrewCard.js
import React from 'react';
import '../styles/SearchCrewCard.css';

const SearchCrewCard = ({ image, date, title, location, description, participants, maxParticipants }) => {
  return (
    <div className="search-crew-card">
      <img src={image} alt={title} className="search-crew-card-image" />
      <div className="search-crew-card-content">
        <h3>{title}</h3>
        <p className="search-crew-card-date">{date}</p>
        <p className="search-crew-card-location">{location}</p>
        <p className="search-crew-card-description">{description}</p>
        <div className="search-crew-card-footer">
          <p className="search-crew-card-participants">참여 인원: {participants}/{maxParticipants}</p>
          <button className="search-crew-card-button">신청하기</button>
        </div>
      </div>
    </div>
  );
};

export default SearchCrewCard;

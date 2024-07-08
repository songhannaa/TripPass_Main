// src/components/CrewCard.js
import React from 'react';
import '../styles/CrewCard.css';

const CrewCard = ({ image, date, title }) => {
  return (
    <div className="crew-card">
      <img src={image} alt={title} className="crew-card-image" />
      <div className="crew-card-details">
        <p>{date}</p>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default CrewCard;

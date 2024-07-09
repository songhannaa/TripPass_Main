import React from 'react';
import '../../styles/tripplan.css';
import locationIcon from '../../assets/location-icon.png';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-header">
        <span className="event-title">{event.title}</span>
        <span className="event-time">{event.time}</span>
      </div>

      <p className="event-description">{event.description}</p>
      <p className="location">
        <img src={locationIcon} alt="Location Icon" className="location-icon" />
        <small>{event.location}</small>
      </p>
    </div>
  );
};

export default EventCard;

import React from 'react';
import EventCard from './EventCard';
import './DayPlan.css';

const DayPlan = ({ date, events }) => {
  return (
    <div className="day-plan">
      <h3>{date}</h3>
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default DayPlan;

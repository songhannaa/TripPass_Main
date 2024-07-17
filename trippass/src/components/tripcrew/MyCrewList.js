// src/components/tripcrew/MyCrewList.js

import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrips } from '../../store/tripSlice';
import axios from 'axios';
import '../../styles/mycrewlist.css';
import { API_URL } from '../../config';

const CrewCard = ({ banner, date, time, title, crewId, userId, tripmate, handleDelete }) => {
  const isOwner = userId === tripmate;
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

const MyCrewList = ({ openPopup }) => {
  const user = useSelector((state) => state.user.user);
  const tripsState = useSelector((state) => state.trip);
  const { trips = [], status } = tripsState;
  const [crews, setCrews] = useState([]);
  const dispatch = useDispatch();

  const fetchCrewData = useCallback(async (tripId) => {
    if (!tripId) return;

    try {
      const response = await axios.get(`${API_URL}/getMyCrew`, { params: { userId: user.userId, tripId: user.mainTrip } });
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

      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setCrews(data);
    } catch (error) {
      console.error('Error fetching crew data:', error);
    }
  }, [user.userId]);

  useEffect(() => {
    if (user && status === 'idle') {
      dispatch(fetchTrips(user.userId));
    }
  }, [dispatch, user, status]);

  useEffect(() => {
    if (trips.length > 0) {
      fetchCrewData(trips[0].tripId);
    }
  }, [trips, fetchCrewData]);

  const handleDelete = async (crewId) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteCrew`, {
        data: { crewId, userId: user.userId },
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        fetchCrewData(trips[0].tripId);
      } else {
        console.error('Error deleting crew:', response.data);
      }
    } catch (error) {
      console.error('Error deleting crew:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="crewSection">
      <h2>마이 크루</h2>
      <div className="sliderContainer">
        <div className="sliderWrapper">
          <div className="slider">
            {crews.map((crew, index) => (
              <CrewCard key={index} {...crew} userId={user.userId} handleDelete={handleDelete} />
            ))}
            <div className="crewCard createCrewCard" onClick={openPopup}>
              <button className="createCrewButton">+<br />New Crew</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCrewList;

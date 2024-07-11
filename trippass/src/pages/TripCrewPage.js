import React, { useEffect, useState } from 'react';
import Layout from '../templates/Layout';
import MyCrewList from '../components/tripcrew/MyCrewList';
import SearchCrew from '../components/tripcrew/SearchCrew';
import axios from 'axios';

const TripCrewPage = () => {
  const [userId, setUserId] = useState(null);
  const [tripId, setTripId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
      setUserId(user.userId);
    }
  }, []);

  useEffect(() => {
    const fetchTripId = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getMyTrips`, {
          params: { userId }
        });

        if (response.data.response.length > 0) {
          setTripId(response.data.response[0].tripId);
        } else {
          console.error('No trips found for the user');
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    if (userId) {
      fetchTripId();
    }
  }, [userId]);

  if (!userId) {
    return <p>로그인이 필요합니다.</p>;
  }

  if (!tripId) {
    return <p>트립 ID를 불러오는 중입니다...</p>;
  }

  return (
    <Layout>
      <MyCrewList />
      <SearchCrew />
    </Layout>
  );
};

export default TripCrewPage;

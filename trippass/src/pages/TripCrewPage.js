// src/pages/TripCrewPage.js

import React, { useEffect, useState } from 'react';
import Layout from '../templates/Layout';
import MyCrewList from '../components/tripcrew/MyCrewList';
import SearchCrew from '../components/tripcrew/SearchCrew'; // SearchCrew 컴포넌트 추가
import axios from 'axios';
import { API_URL } from '../config';

const TripCrewPage = () => {
  const [userId, setUserId] = useState(null);
  const [tripId, setTripId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUserId(storedUser.userId);

        try {
          const response = await axios.get(`${API_URL}/getMyTrips`, {
            params: { userId: storedUser.userId }
          });

          if (response.data.response.length > 0) {
            setTripId(response.data.response[0].tripId);
          } else {
            console.warn("No trips found for this user");
          }
        } catch (error) {
          console.error("Error fetching trip data", error);
        }
      } else {
        console.error("No user found in local storage");
      }
    };

    fetchUserData();
  }, []);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <MyCrewList userId={userId} tripId={tripId} />
      <SearchCrew userId={userId} /> {/* SearchCrew 컴포넌트 추가 */}
    </Layout>
  );
};

export default TripCrewPage;

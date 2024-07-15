// src/pages/TripCrewPage.js

import React, { useEffect, useState } from 'react';
import Layout from '../templates/Layout';
import MyCrewList from '../components/tripcrew/MyCrewList';
import SearchCrew from '../components/tripcrew/SearchCrew';
import JoinRequestPop from '../components/tripcrew/JoinRequestPop';
import axios from 'axios';
import { API_URL } from '../config';

const TripCrewPage = () => {
  const [userId, setUserId] = useState(null);
  const [tripId, setTripId] = useState(null);
  const [joinRequests, setJoinRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  useEffect(() => {
    const fetchJoinRequests = async () => {
      if (!tripId) return;

      try {
        const response = await axios.get(`${API_URL}/getJoinRequests`, {
          params: { tripId }
        });
        setJoinRequests(response.data.response);
      } catch (error) {
        console.error("Error fetching join requests", error);
      }
    };

    fetchJoinRequests();
  }, [tripId]);

  const handleAccept = async () => {
    try {
      await axios.post(`${API_URL}/updateCrewTripMate`, {
        crewId: selectedRequest.crewId,
        userId: selectedRequest.userId,
        status: 1
      });
      setJoinRequests(joinRequests.filter(req => req.requestId !== selectedRequest.requestId));
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error accepting join request", error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.post(`${API_URL}/updateCrewTripMate`, {
        crewId: selectedRequest.crewId,
        userId: selectedRequest.userId,
        status: 2
      });
      setJoinRequests(joinRequests.filter(req => req.requestId !== selectedRequest.requestId));
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error rejecting join request", error);
    }
  };

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <MyCrewList userId={userId} tripId={tripId} />
      <SearchCrew userId={userId} />
      {selectedRequest && (
        <JoinRequestPop
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </Layout>
  );
};

export default TripCrewPage;

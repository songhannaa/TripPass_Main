import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TripCard from './TripCard';
import '../../styles/mytrip.css';
import { API_URL } from "../../config";
import { useSelector } from 'react-redux';

const MyTrip = () => {
  const { user } = useSelector(state => state.user);
  const [tripPlans, setTripPlans] = useState([]);
  const [highlightedTripId, setHighlightedTripId] = useState('487cbc12-b24a-4c1f-b6e7-bba46315be93');

  useEffect(() => {
    const fetchTripPlans = async () => {
      try {

        const response = await axios.get(`${API_URL}/getMyTrips?userId=${user.userId}`);
        if (response.data['result code'] === 200) {
          const plans = response.data.response;

          // 특정 tripId를 가진 항목을 첫 번째로 정렬
          plans.sort((a, b) => {
            if (a.tripId === highlightedTripId) return -1;
            if (b.tripId === highlightedTripId) return 1;
            return new Date(a.startDate) - new Date(b.startDate); // 나머지는 startDate 기준으로 정렬
          });

          setTripPlans(plans);
        } else {
          console.error('Failed to fetch trip plans:', response.data);
        }
      } catch (error) {
        console.error('Error fetching trip plans:', error);
      }
    };

    fetchTripPlans();
  }, [highlightedTripId]);

  const handleCardClick = (tripId) => {
    setHighlightedTripId(tripId);
  };

  return (
    <div className="MyTrip_Container">
      <h1>마이 트립</h1>
      <div className="MyTrip_CardSection">
        {tripPlans.map((trip) => (
          <TripCard
            key={trip.tripId}
            title={trip.title}
            startDate={trip.startDate}
            endDate={trip.endDate}
            banner={trip.banner}
            isHighlighted={trip.tripId === highlightedTripId}
            onClick={() => handleCardClick(trip.tripId)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyTrip;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TripCard from './TripCard';
import '../../styles/mytrip.css';
import { API_URL } from "../../config";
import { useSelector, useDispatch } from 'react-redux';
import { updateUserMainTrip } from '../../store/userSlice';

const MyTrip = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [tripPlans, setTripPlans] = useState([]);
  const [highlightedTripId, setHighlightedTripId] = useState(user.mainTrip || null);

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
  }, [highlightedTripId, user.userId]);

  const handleCardClick = async (tripId) => {
    // 옵티미스틱 UI 업데이트
    setHighlightedTripId(tripId);
    dispatch(updateUserMainTrip(tripId));

    try {
      const response = await axios.post(`${API_URL}/updateUserMainTrip`, {
        userId: user.userId,
        mainTrip: tripId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data['result code'] !== 200) {
        console.error('Failed to update main trip:', response.data);
        // 서버 응답 실패 시 상태 되돌리기
        setHighlightedTripId(user.mainTrip);
        dispatch(updateUserMainTrip(user.mainTrip));
      }
    } catch (error) {
      console.error('Error updating main trip:', error);
      // 서버 요청 실패 시 상태 되돌리기
      setHighlightedTripId(user.mainTrip);
      dispatch(updateUserMainTrip(user.mainTrip));
    }
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

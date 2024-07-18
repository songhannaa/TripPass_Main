import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TripCard from './TripCard';
import { MdOutlineAddCircleOutline } from "react-icons/md";
import '../../styles/mytrip.css';
import { API_URL } from "../../config";
import { useSelector, useDispatch } from 'react-redux';
import { updateUserMainTrip } from '../../store/userSlice';
import NewTrip from './NewTrip';

const MyTrip = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [tripPlans, setTripPlans] = useState([]);
  const [highlightedTripId, setHighlightedTripId] = useState(user.mainTrip || null);
  const [isCreatingNewTrip, setIsCreatingNewTrip] = useState(false);

  useEffect(() => {
    const fetchTripPlans = async () => {
      try {
        const response = await axios.get(`${API_URL}/getMyTrips?userId=${user.userId}`);
        if (response.data['result code'] === 200) {
          setTripPlans(response.data.response);
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
        setHighlightedTripId(user.mainTrip);
        dispatch(updateUserMainTrip(user.mainTrip));
      }
    } catch (error) {
      console.error('Error updating main trip:', error);
      setHighlightedTripId(user.mainTrip);
      dispatch(updateUserMainTrip(user.mainTrip));
    }
  };

  const handleDelete = async (tripId) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteTrip`, {
        data: { userId: user.userId, tripId: tripId },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data['result code'] === 200) {
        setTripPlans(prevPlans => prevPlans.filter(trip => trip.tripId !== tripId));
        if (tripId === highlightedTripId) {
          setHighlightedTripId(null);
          dispatch(updateUserMainTrip(null));
        }
      } else {
        console.error('Failed to delete trip:', response.data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.detail === "크루 참여가 있는 여행은 삭제할 수 없습니다.") {
            alert("크루 참여가 있는 여행은 삭제할 수 없습니다.");
          } else {
            alert("요청에 문제가 있습니다.");
          }
        } else {
          alert("트립 삭제를 할 수 없습니다.");
        }
      } else {
        alert("서버와의 통신에 문제가 발생했습니다.");
      }
      console.error('Error deleting trip:', error);
    }
  };

  return (
    <div className="MyTrip_Container">
      <div className='section-title'>마이 트립</div>
      <div className="MyTrip_CardSection">
        <div className="NewTrip_Card">
          <button className='TripCard_InsertButton' onClick={() => setIsCreatingNewTrip(true)}>
                <MdOutlineAddCircleOutline className='TripCard_Insert' />
          </button>
          <h3>새 여행 만들기</h3>
        </div>
        {tripPlans.map((trip) => (
          <TripCard
            key={trip.tripId}
            title={trip.title}
            startDate={trip.startDate}
            endDate={trip.endDate}
            banner={trip.banner}
            isHighlighted={trip.tripId === highlightedTripId}
            onClick={() => handleCardClick(trip.tripId)}
            onDelete={() => handleDelete(trip.tripId)}
          />
        ))}
      </div>
      {isCreatingNewTrip && <NewTrip onClose={() => setIsCreatingNewTrip(false)} />}
    </div>
  );
};

export default MyTrip;
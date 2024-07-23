import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from "../../config";

const DailyPlan = () => {
  const { user } = useSelector(state => state.user);
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    const fetchTripPlans = async () => {
      try {
        const response = await axios.get(`${API_URL}/getTripPlans?tripId=${user.mainTrip}`);
        if (response.data['result code'] === 200) {
          const data = response.data.response;
          setTripData(data);
        } else {
          console.error('Failed to fetch trip data:', response.data);
        }   
      } catch (error) {
        console.error('일정 가져오기 실패:', error.message);
      }
    };

    if (user.mainTrip) {
      fetchTripPlans();
    }
  }, [user.mainTrip]);

  return (
    <>
      <div className="dailyPlanSection">
        <div className="dailyPlanContentTitle">여행 계획</div>
        <div className="dailyPlanContent">
            <ul className="dailyPlanList">
              {tripData && tripData.map((plan, index) => (
                <li key={index}>
                  <div className="dailyPlanDate">{plan.date}</div>
                  <div className="dailyPlanTime">{plan.time}</div>
                  <div className="dailyPlanTitle">{plan.title}</div>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </>
  );
};

export default DailyPlan;
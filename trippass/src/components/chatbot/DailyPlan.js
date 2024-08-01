import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_URL } from "../../config";
import styled from 'styled-components';
import { FaMapMarkerAlt } from "react-icons/fa"; 

// Styled components
const DailyPlanSection = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  height: 85vh;
  overflow-y: auto;
`;

const DailyPlanList = styled.div`
  list-style: none;
  padding: 0;
`;

const DailyPlanItem = styled.li`
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 10px;
  background: #fff;
`;

const PlanDate = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #717171;
`;

const PlanTitle = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f0f4ff;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 14px;
`;

const PlanTime = styled.div`
  font-size: 14px;
  color: #555;
`;

const PlanAddress = styled.div`
  font-size: 14px;
  color: #777;
  display: flex;
  align-items: flex-start;
  margin-top: 8px;
`;

const PlanDescription = styled.div`
  font-size: 14px;
  color: #777;
  margin-top: 8px;
  margin-left: 3%;
  margin-right: 3%;
`;

const DailyPlan = () => {
  const { user } = useSelector(state => state.user);
  const [tripData, setTripData] = useState(null);
  const dispatch = useDispatch();

  // 초 단위를 HH:MM 형식으로 변환하는 함수
  const secondsToTimeString = (seconds) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // 날짜를 "YYYY년 MM월 DD일" 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  };

  // 날짜별로 그룹화하는 함수
  const groupByDate = (data) => {
    return data.reduce((acc, plan) => {
      const { date } = plan;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(plan);
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchTripPlans = async () => {
      try {
        const response = await axios.get(`${API_URL}/getTripPlans?tripId=${user.mainTrip}`);
        if (response.data['result code'] === 200) {
          let data = response.data.response;
          // 시간이 초 단위로 되어 있으면 변환
          data = data.map(plan => ({
            ...plan,
            time: typeof plan.time === 'number' ? secondsToTimeString(plan.time) : plan.time
          }));

          // 날짜와 시간 순서대로 소팅
          data = data.sort((a, b) => {
            const dateTimeA = new Date(`${a.date}T${a.time}`);
            const dateTimeB = new Date(`${b.date}T${b.time}`);
            return dateTimeA - dateTimeB;
          });

          setTripData(groupByDate(data));
        
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
    <DailyPlanSection>
      <div className="dailyPlanContentTitle">여행 계획</div>
      <DailyPlanList>
        {tripData && Object.keys(tripData).map(date => (
          <div key={date}>
            <PlanDate>{formatDate(date)}</PlanDate>
            <ul>
              {tripData[date].map((plan, index) => (
                <DailyPlanItem key={index}>
                  <PlanTitle>
                    <div>{plan.title}</div>
                    <PlanTime>{plan.time}</PlanTime>
                  </PlanTitle>
                  <PlanAddress><FaMapMarkerAlt style={{ marginRight: '4px' }} />{plan.address}</PlanAddress>

                  <PlanDescription>{plan.description}</PlanDescription>

                </DailyPlanItem>
              ))}
            </ul>
          </div>
        ))}
      </DailyPlanList>
    </DailyPlanSection>
  );
};

export default DailyPlan;

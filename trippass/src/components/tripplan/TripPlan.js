import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DayPlan from './DayPlan';
import './DayPlan.css';
import './TripPlan.css';
import noScheduleRobot from '../../assets/margnun.png'; // 로봇 이미지 경로
import { RiArrowLeftWideFill } from "react-icons/ri";
import { RiArrowRightWideFill } from "react-icons/ri";

const TripPlan = () => {
  const [startYear, setStartYear] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endYear, setEndYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endDay, setEndDay] = useState('');
  const [tripPlans, setTripPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const itemsPerPage = 3; // 페이지당 항목 수
  const userId = '9a29fb74-cf6f-4eff-b0e2-249ed3677527'; //userid
  const apiUrl = process.env.REACT_APP_API_URL + '/getMyTrips?userId=' + userId;

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        const tripData = response.data.response[0];
        const [startY, startM, startD] = tripData.startDate.split('-');
        const [endY, endM, endD] = tripData.endDate.split('-');
        const tripId = tripData.tripId;

        setStartYear(startY);
        setStartMonth(startM);
        setStartDay(startD);
        setEndYear(endY);
        setEndMonth(endM);
        setEndDay(endD);

        return axios.get(`${process.env.REACT_APP_API_URL}/getTripPlans?tripId=${tripId}`);
      })
      .then(response => {
        const plans = response.data.response;
        plans.sort((a, b) => new Date(a.date + 'T' + new Date(a.time * 1000).toISOString().substr(11, 8)) - new Date(b.date + 'T' + new Date(b.time * 1000).toISOString().substr(11, 8)));
        setTripPlans(plans);
      })
      .catch(error => {
        console.error('Error fetching the trip data:', error);
      });
  }, [apiUrl]);

  if (!startYear || !startMonth || !startDay || !endYear || !endMonth || !endDay || tripPlans.length === 0) {
    return (
      <div className="no-schedule">
        <p>아직 일정이 없어요!<br />새 일정을 만들어 볼까요?</p>
        <img src={noScheduleRobot} alt="No Schedule Robot" className="no-schedule-robot" />
      </div>
    );
  }

  const groupedPlans = tripPlans.reduce((acc, plan) => {
    const date = plan.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(plan);
    return acc;
  }, {});

  const paginatedDates = Object.keys(groupedPlans).slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="trip-plan">
      <div className="trip-plan-header">
        <h2>{`${startYear}년 ${startMonth}월 ${startDay}일 - ${endYear}년 ${endMonth}월 ${endDay}일`}</h2>
        <div className="pagination-buttons">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>  <RiArrowLeftWideFill /> </button>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={(currentPage + 1) * itemsPerPage >= Object.keys(groupedPlans).length}> <RiArrowRightWideFill /> </button>
        </div>
      </div>
      <div className="days">
        {paginatedDates.map(date => (
          <DayPlan
            key={date}
            date={`${new Date(date).getFullYear()}년 ${new Date(date).getMonth() + 1}월 ${new Date(date).getDate()}일`}
            events={groupedPlans[date].map(event => ({
              time: new Date(event.time * 1000).toISOString().substr(11, 8),
              title: event.title,
              description: event.description,
              location: event.place,
            }))}
          />
        ))}
      </div>
    </div>
  );
};

export default TripPlan;

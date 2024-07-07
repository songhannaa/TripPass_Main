import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import "../../styles/schedule.css";

const CalendarWrapper = styled.div`
  display: flex;
  background-color: #ffffff;
  margin-right: 20px;
  border-radius: 20px;
`;

const StyledCalendar = styled(Calendar)`
  background-color: #ffffff;
  padding: 30px;  
  border-radius: 20px;
  border: none;

  .react-calendar {
    border: none;
    font-weight: bold; 
  }

  .react-calendar__tile--active {
    background-color: #DFE1FF;
    color: black;
  }

  .react-calendar__tile--active:hover {
    background-color: #DFE1FF; /* 선택된 날짜의 배경 색상 */
  }

  .react-calendar__tile:not(.react-calendar__tile--active):hover {
    background: none; /* 선택되지 않은 날짜에 hover 시 배경을 없앰 */
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    border-bottom: none;
  }
  .react-calendar__navigation {
    display: block;
    height: 5px;
    margin: 0 1px 30px 10px;
  }
  .react-calendar__navigation__label > span{
    font-weight: bold;
    color: #474747;
    font-size: 17px;
  }
  .react-calendar__tile--active:enabled:hover, .react-calendar__tile--active:enabled:focus {
    background: #DFE1FF;
  }
  .react-calendar__tile--now {
    background: #DFE1FF;
  }

`;

const ScheduleContainer = styled.div`
  padding: 40px 40px 20px 10px;
  width: 70%;
`;

const DashboardCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <CalendarWrapper>
      <StyledCalendar
        value={date}
        onChange={onChange}
        prevLabel={null}
        prev2Label={null}
        nextLabel={null}
        next2Label={null}
        calendarType="gregory" 
        view="month"
        showNeighboringMonth={false} 
        formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
      />
      <ScheduleContainer>
        <div className="schedule">
          <div className="scheduleDay">
            7월 7일 계획
          </div>      
          <ul>
            <li>
              <div className="scheduleTitle">
                🚍 Bus transfer
              </div>
              <div className="scheduleContent">
                9월 16일 (월), 9:30 - 10:00
              </div>
            </li>
            <li>
              <div className="scheduleTitle">
                🚍 Bus transfer
              </div>
              <div className="scheduleContent">
                9월 16일 (월), 9:30 - 10:00
              </div>
            </li>
            <li>
              <div className="scheduleTitle">
                🚍 Bus transfer
              </div>
              <div className="scheduleContent">
                9월 16일 (월), 9:30 - 10:00
              </div>
            </li>
            <li>
              <div className="scheduleTitle">
                🚍 Bus transfer
              </div>
              <div className="scheduleContent">
                9월 16일 (월), 9:30 - 10:00
              </div>
            </li>
            <li>
              <div className="scheduleTitle">
                🚍 Bus transfer
              </div>
              <div className="scheduleContent">
                9월 16일 (월), 9:30 - 10:00
              </div>
            </li>
            <li>
              <div className="scheduleTitle">
                🚍 Bus transfer
              </div>
              <div className="scheduleContent">
                9월 16일 (월), 9:30 - 10:00
              </div>
            </li>
          </ul>
        </div>
      </ScheduleContainer>
    </CalendarWrapper>
  );
};

export default DashboardCalendar;

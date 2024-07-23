import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc";
import { RiMapPinAddLine } from "react-icons/ri";
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  position: relative;
`;

const TripPlace = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCalendarClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false); // 선택 후 달력 닫기
  };

  return (
    <>
      <div className="tripPlaceSection">
        <div className="tripPlaceTitle"><RiMapPinAddLine />&nbsp;&nbsp;저장한 장소</div>
        <div className="tripPlaceContent">
          <ul>
            <li>
              <div className="tripPlaceName">
                Basílica de la Sagrada Família Basílica de la Sagrada Família
              </div>
              <CalendarWrapper className="tripPlaceCalendar">
                <FcCalendar onClick={handleCalendarClick} />
                {showDatePicker && (
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={20}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    inline
                  />
                )}
              </CalendarWrapper>
            </li>
            <li>
              <div className="tripPlaceName">
                Basílica de la Sagrada Família
              </div>
              <CalendarWrapper className="tripPlaceCalendar">
                <FcCalendar onClick={handleCalendarClick} />
                {showDatePicker && (
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={20}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    inline
                  />
                )}
              </CalendarWrapper>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TripPlace;

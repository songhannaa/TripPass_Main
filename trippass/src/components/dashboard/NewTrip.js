import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/newtrip.css";
import countries from '../../data/countryCity.json';
import axios from 'axios';
import { API_URL } from "../../config";
import { useNavigate } from 'react-router-dom';
import { updateUserMainTrip } from '../../store/userSlice';
import 지영이 from '../../assets/지영이.png';

const NewTrip = ({ onClose }) => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    
    const selectedCountryObj = countries.data.find(c => c.country === country);
    if (selectedCountryObj) {
      setSelectedCity(selectedCountryObj.city[0].city_name);
    }
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('userId', user.userId);
    formData.append('title', title);
    formData.append('contry', selectedCountry);
    formData.append('city', selectedCity);
    formData.append('startDate', startDate ? startDate.toISOString().split('T')[0] : '');
    formData.append('endDate', endDate ? endDate.toISOString().split('T')[0] : '');

    try {
      const response = await axios.post(`${API_URL}/insertmyTrips`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data["result code"] === 200) {
        alert('여행 정보 저장 완료 채팅을 시작합니다!');
        navigate('/chat');
        const tripId = response.data.response;
        dispatch(updateUserMainTrip(tripId));
        onClose();
      } else {
        alert('Failed to add trip');
      }
    } catch (error) {
      console.error('Error adding trip:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="new-trip-title">New Trip</div>
        <form className="new-trip-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>제목</label>
            <input type="text" placeholder="제목을 입력하세요." value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div className="form-group">
            <label>지역</label>
            <div className="region-select">
              <select onChange={handleCountryChange} value={selectedCountry || ''}>
                <option value="" disabled>국가</option>
                {countries.data.map((country, index) => (
                  <option key={index} value={country.country}>{country.country}</option>
                ))}
              </select>
              <select onChange={handleCityChange} value={selectedCity || ''}>
                <option value="" disabled>도시</option>
                {selectedCountry &&
                  countries.data.find(c => c.country === selectedCountry)?.city.map((city, index) => (
                    <option key={index} value={city.city_name}>{city.city_name}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>일정</label>
            <div className="date-picker-container">
              <DatePicker
                selected={startDate}
                onChange={(dates) => {
                  const [start, end] = dates;
                  setStartDate(start);
                  setEndDate(end);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                dateFormat="yyyy-MM-dd"
                isClearable={true}
              />
            </div>
          </div>
          <div className="form-group">
            <label>배너</label>
            <div className="container">
              <div className="image">
                <img src={지영이} alt="지영이" />
              </div>
            </div>
          </div>
          <div className="form-group btnList">
            <button type="submit">저장</button>
            <button type="reset" onClick={onClose}>닫기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTrip;

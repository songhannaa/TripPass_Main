import React, { useState, useEffect } from "react"; // useRef 제거
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


const TypingEffect = ({ text, typingSpeed = 100, delay = 1000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (displayText === text) {
      const eraseTimeout = setTimeout(() => {
        setDisplayText('');
      }, delay);
      return () => clearTimeout(eraseTimeout);
    } else {
      const typingInterval = setInterval(() => {
        setDisplayText(prev => prev + text[index]);
        setIndex(prev => (prev + 1) % text.length);
      }, typingSpeed);
      return () => clearInterval(typingInterval);
    }
  }, [displayText, text, index, typingSpeed, delay]);

  return <div className="typing-text">{displayText}</div>;
};

const NewTrip = ({ onClose }) => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);

    const selectedCountryObj = countries.data.find(c => c.country === country);
    if (selectedCountryObj) {
      const city = selectedCountryObj.city[0];
      setSelectedCity(city.city_name);
      setLatitude(city.latitude);
      setLongitude(city.longitude);
    }
  };

  const handleCityChange = (event) => {
    const city_name = event.target.value;
    const selectedCountryObj = countries.data.find(c => c.country === selectedCountry);
    const city = selectedCountryObj.city.find(city => city.city_name === city_name);

    setSelectedCity(city.city_name);
    setLatitude(city.latitude);
    setLongitude(city.longitude);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('userId', user.userId);
    formData.append('title', title);
    formData.append('contry', selectedCountry);
    formData.append('city', selectedCity);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('startDate', startDate ? startDate.toISOString().split('T')[0] : '');
    formData.append('endDate', endDate ? endDate.toISOString().split('T')[0] : '');

    try {
      const response = await axios.post(`${API_URL}/insertmyTrips`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data["result code"] === 200) {
        alert('여행 계획이 저장되었습니다!');
        navigate('/tripPlan');
        const tripId = response.data.response;
        dispatch(updateUserMainTrip(tripId));
        onClose();
      } else {
        alert('여행 정보 저장에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error adding trip:', error);
      alert('여행 정보 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <TypingEffect 
              text="AI가 이미지를 생성중입니다! 잠시만 기다려주세요. . . 😎" 
              typingSpeed={100}
              delay={1000}    
            />
          </div>
        )}
        <div className="new-trip-title">New Trip</div>
        <form className="new-trip-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>제목</label>
            <input type="text" placeholder="제목을 입력하세요." value={title} onChange={(e) => setTitle(e.target.value)} disabled={loading} />
          </div>
          <div className="form-group">
            <label>지역</label>
            <div className="region-select">
              <select onChange={handleCountryChange} value={selectedCountry || ''} disabled={loading}>
                <option value="" disabled>국가</option>
                {countries.data.map((country, index) => (
                  <option key={index} value={country.country}>{country.country}</option>
                ))}
              </select>
              <select onChange={handleCityChange} value={selectedCity || ''} disabled={loading}>
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
                disabled={loading}
              />
            </div>
          </div>
          <div className="form-group">
            <label>배너</label>
            <img src={지영이} alt="지영이" className="bannerBot" />
          </div>
          <div className="form-group btnList">
            <button type="submit" disabled={loading}>저장</button>
            <button type="reset" onClick={onClose} disabled={loading}>닫기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTrip;

import React, { useState } from "react";
import { useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/newtrip.css";
import countries from '../../data/countryCity.json';

const NewTrip = ({ onClose }) => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);

    // Find the selected country object from JSON data
    const selectedCountryObj = countries.data.find(c => c.country === country);
    if (selectedCountryObj) {
      // Set the first city as default
      setSelectedCity(selectedCountryObj.city[0].english_name);
    }
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="new-trip-title">New Trip</div>
        <form className="new-trip-form">
          <div className="form-group">
            <label>제목</label>
            <input type="text" placeholder="제목을 입력하세요." />
          </div>
          <div className="form-group">
            <label>지역</label>
            <div className="region-select">
              <select onChange={handleCountryChange} value={selectedCountry || ''}>
                <option disabled>국가</option>
                {countries.data.map((country, index) => (
                  <option key={index} value={country.country}>{country.country}</option>
                ))}
              </select>
              <select onChange={handleCityChange} value={selectedCity || ''}>
                <option disabled>도시</option>
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
            <label>이미지</label>
            <input type="file" className='fileInput' accept="image/*" onChange={handleFileChange} />
          </div>
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="미리보기" />
            </div>
          )}
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

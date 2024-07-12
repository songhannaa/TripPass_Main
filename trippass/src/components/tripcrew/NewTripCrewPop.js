import React, { useState, useEffect } from 'react';
import '../../styles/NewTripCrewPop.css';
import axios from 'axios';
import { API_URL } from "../../config";

const NewTripCrewPop = ({ onClose, onSave, tripId }) => {
  const [formData, setFormData] = useState({
    crewName: '',
    schedule: '',
    contact: '',
    numOfMate: '',
    note: '',
    banner: null,
    bannerPreview: null,
  });

  const [tripPlans, setTripPlans] = useState([]);

  useEffect(() => {
    const fetchTripPlans = async () => {
      try {
        const response = await axios.get(`${API_URL}/getTripPlans`, { params: { tripId } });
        setTripPlans(response.data.response);
      } catch (error) {
        console.error('Error fetching trip plans:', error);
      }
    };

    fetchTripPlans();
  }, [tripId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      banner: file,
      bannerPreview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedPlan = tripPlans.find(plan => plan.planId === formData.schedule);
    const newCrew = {
      ...formData,
      date: selectedPlan.date,
      time: selectedPlan.time,
      place: selectedPlan.place,
      planId: selectedPlan.planId,
      bannerPreview: formData.bannerPreview,
    };

    onSave(newCrew);
    onClose();
  };

  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <button className="closeButton" onClick={onClose}>X</button>
        <h2>New Trip Crew</h2>
        <form className="newCrewForm" onSubmit={handleSubmit}>
          <label>
            제목
            <input type="text" name="crewName" value={formData.crewName} onChange={handleChange} />
          </label>
          <label>
            일정
            <select name="schedule" value={formData.schedule} onChange={handleChange}>
              <option value="">--- 선택하세요 ---</option>
              {tripPlans.map(plan => (
                <option key={plan.planId} value={plan.planId}>
                  {plan.date} {plan.time} - {plan.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            연락처
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
          </label>
          <label>
            인원
            <input type="text" name="numOfMate" value={formData.numOfMate} onChange={handleChange} />
          </label>
          <label>
            소개
            <textarea name="note" maxLength="200" value={formData.note} onChange={handleChange}></textarea>
          </label>
          <label>
            이미지
            <input type="file" name="banner" accept="image/*" onChange={handleBannerChange} />
          </label>
          {formData.bannerPreview && (
            <div className="bannerPreview">
              <img src={formData.bannerPreview} alt="배너 이미지 미리보기" />
            </div>
          )}
          <button type="submit">저장</button>
        </form>
      </div>
    </div>
  );
};

export default NewTripCrewPop;

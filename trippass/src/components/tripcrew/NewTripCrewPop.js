import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/NewTripCrewPop.css';

const NewTripCrewPop = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    crewName: '',
    date: '',
    time: '',
    location: '',
    contact: '',
    members: '',
    description: '',
    banner: null,
    bannerPreview: null,
    planId: 'your-plan-id', // 이 부분은 실제 planId로 교체해야 합니다.
  });

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

    const data = new FormData();
    data.append('planId', formData.planId);
    data.append('date', formData.date);
    data.append('title', formData.crewName);
    data.append('contact', formData.contact);
    data.append('note', formData.description);
    data.append('numOfMate', formData.members);
    if (formData.banner) {
      data.append('banner', formData.banner);
    }
    data.append('sincheongIn', '');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/insertCrew`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const newCrewId = response.data.response;
        onSave({
          ...formData,
          crewId: newCrewId,
          bannerPreview: formData.bannerPreview,
        });
        onClose();
      } else {
        console.error('Error saving crew:', response.data);
      }
    } catch (error) {
      console.error('Error saving crew:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>New Trip Crew</h2>
        <form onSubmit={handleSubmit}>
          <label>
            제목
            <input type="text" name="crewName" value={formData.crewName} onChange={handleChange} />
          </label>
          <label>
            일자
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
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
            배너 이미지
            <input type="file" name="banner" accept="banner/*" onChange={handleBannerChange} />
          </label>
          {formData.bannerPreview && (
            <div className="banner-preview">
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
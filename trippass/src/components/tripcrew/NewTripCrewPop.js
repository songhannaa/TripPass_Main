import React, { useState, useEffect } from 'react';
import '../../styles/newtripcrewpop.css';
import axios from 'axios';
import { API_URL } from "../../config";

const NewTripCrewPop = ({ onClose, onSave, tripId, userId }) => {
  const [formData, setFormData] = useState({
    crewName: '',
    scheduleDate: '',
    scheduleTime: '',
    contact: '',
    numOfMate: '',
    note: '',
    banner: null,
    bannerPreview: null,
  });

  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const fetchTripDates = async () => {
      try {
        const response = await axios.get(`${API_URL}/getTripPlans`, { params: { tripId } });
        const uniqueDates = [...new Set(response.data.response.map(plan => plan.date))].sort();
        setDates(uniqueDates);
      } catch (error) {
        console.error('Error fetching trip dates:', error);
      }
    };

    fetchTripDates();
  }, [tripId]);

  //특정 날짜와 사용자를 기준으로 여행 계획을 필터링
  //시간을 변환할 때 convertSecondsToTime 함수를 사용합니다. 이 함수는 초 단위 시간을 'HH' 형식의 문자열로 변환
  const fetchTimes = async (date) => {
    try {
      const response = await axios.get(`${API_URL}/getTripPlansDate`, { params: { date, tripId } });
      const sortedPlans = response.data.response.sort((a, b) => a.time - b.time);
      setTimes(sortedPlans.map(plan => ({
        time: convertSecondsToTime(plan.time),
        title: plan.title,
        planId: plan.planId
      })));
    } catch (error) {
      console.error('Error fetching times for date:', error);
    }
  };

  const convertSecondsToTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      scheduleDate: value,
      scheduleTime: '', // Reset time when date changes
    });
    fetchTimes(value);
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

    const selectedPlan = times.find(time => time.time === formData.scheduleTime);

    if (!selectedPlan) {
      alert("일정과 시간을 올바르게 선택하세요.");
      return;
    }

    const newCrew = {
      planId: selectedPlan.planId,
      title: formData.crewName,
      contact: formData.contact,
      numOfMate: formData.numOfMate,
      note: formData.note,
      banner: formData.banner,
    };

    const data = new FormData();
    data.append('planId', newCrew.planId);
    data.append('title', newCrew.title);
    data.append('contact', newCrew.contact);
    data.append('note', newCrew.note);
    data.append('numOfMate', newCrew.numOfMate);
    if (newCrew.banner) {
      data.append('banner', newCrew.banner);
    }

    try {
      const response = await axios.post(`${API_URL}/insertCrew`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Crew saved successfully');
        onSave(newCrew);
        onClose();
      } else {
        console.error('Error saving crew:', response.data);
        alert('크루를 저장하는데 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error saving crew:', error);
      alert('크루를 저장하는데 오류가 발생했습니다.');
    }
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
            <select name="scheduleDate" value={formData.scheduleDate} onChange={handleDateChange}>
              <option value="">--- 선택하세요 ---</option>
              {dates.map(date => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </label>
          <label>
            시간
            <select name="scheduleTime" value={formData.scheduleTime} onChange={handleChange}>
              <option value="">--- 선택하세요 ---</option>
              {times.map(time => (
                <option key={time.planId} value={time.time}>
                  {time.time}, {time.title}
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
            <div className="imagePreview">
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

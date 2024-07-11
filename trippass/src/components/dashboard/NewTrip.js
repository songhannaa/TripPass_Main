import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/newtrip.css";

const NewTrip = ({ onClose }) => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [preview, setPreview] = useState(null);
  
	const handleFileChange = (event) => {
	  const file = event.target.files[0];
	  if (file) {
		const previewURL = URL.createObjectURL(file);
		setPreview(previewURL);
	  }
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
              <select>
                <option>국가</option>
                {/* 국가 옵션 추가 */}
              </select>
              <select>
                <option>도시</option>
                {/* 도시 옵션 추가 */}
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

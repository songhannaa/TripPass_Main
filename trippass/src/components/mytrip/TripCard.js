import React from 'react';
import { TiDelete } from "react-icons/ti";
import '../../styles/mytrip.css';

const TripCard = ({ title, startDate, endDate, banner, isHighlighted, onClick, onDelete }) => {
  const imageUrl = `data:image/jpeg;base64,${banner}`;
  const imageClass = isHighlighted ? 'TripCard_Image' : 'TripCard_Image TripCard_Image_Dark';

  const handleDeleteClick = () => {
    if (window.confirm("해당 여행을 삭제하시겠습니까?")) {
      onDelete();
    }
  };

  return (
    <div className="TripCard_Card">
      <div className="TripCard_ImageContainer">
        <img src={imageUrl} alt={title} className={imageClass} />
        <div className="TripCard_Overlay">
          {!isHighlighted && (
            <button className='TripCard_DeleteButton' onClick={handleDeleteClick}>
              <TiDelete className='TripCard_Delete' />
            </button>
          )}
          <h3 className="TripCard_Title">{title}</h3>
          <p className="TripCard_Date">{`${startDate} ~ ${endDate}`}</p>
          {!isHighlighted && (
            <div className="TripCard_MainOverlay">
              <p className="TripCard_MainText" onClick={onClick}>메인으로 설정하기</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;

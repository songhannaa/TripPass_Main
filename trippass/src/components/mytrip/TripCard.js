import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/mytrip.css';

const TripCard = ({ title, startDate, endDate, banner, isHighlighted, onClick }) => {
  const imageUrl = `data:image/jpeg;base64,${banner}`;
  const imageClass = isHighlighted ? 'TripCard_Image' : 'TripCard_Image TripCard_Image_Dark';

  return (
    <div className="TripCard_Card" onClick={onClick}>
      <div className="TripCard_ImageContainer">
        <img src={imageUrl} alt={title} className={imageClass} />
        <div className="TripCard_Overlay">
          <h3 className="TripCard_Title">{title}</h3>
          <p className="TripCard_Date">{`${startDate} - ${endDate}`}</p>
          {!isHighlighted && (
            <div className="TripCard_MainOverlay">
              <p className="TripCard_MainText">메인으로 설정하기</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TripCard.propTypes = {
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  banner: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TripCard;

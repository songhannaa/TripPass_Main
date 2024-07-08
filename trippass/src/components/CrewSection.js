// src/components/CrewSection.js
import React from 'react';
import Slider from 'react-slick';
import CrewCard from './CrewCard';
import '../styles/CrewSection.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CrewSection = ({ crewData }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="crew-section">
      <h2>함께하는 크루</h2>
      <Slider {...settings}>
        {crewData.map((crew, index) => (
          <CrewCard key={index} image={crew.image} date={crew.date} title={crew.title} />
        ))}
        <div className="crew-card create-crew-card">
          <button className="create-crew-button">+ 새로운 크루 만들기</button>
        </div>
      </Slider>
    </div>
  );
};

export default CrewSection;

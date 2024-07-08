// src/components/SearchCrew.js
import React from 'react';
import SearchCrewCard from './SearchCrewCard';
import '../styles/SearchCrew.css';

const SearchCrew = () => {
  const crewData = [
    {
      image: '/images/image1.jpg',
      date: '2024년 9월 15일 9:00',
      title: '유니버셜 키치',
      location: 'L\'Example, 08013 Barcelona, Spain',
      description: '유니버셜 놀이공원 방문~~ 어서오세요~ 무서운 놀이기구는 절대 못타유',
      participants: 3,
      maxParticipants: 4,
    },
    {
      image: '/images/image2.jpg',
      date: '2024년 9월 15일 18:00',
      title: '바르셀로나 축구경기 관람',
      location: 'L\'Example, 08013 Barcelona, Spain',
      description: '축구 보러가요~ 티켓은 개인 지참 상의해요!',
      participants: 2,
      maxParticipants: 3,
    },
    {
      image: '/images/image3.jpg',
      date: '2024년 9월 15일 15:00',
      title: '아 애들이다.',
      location: 'L\'Example, 08013 Barcelona, Spain',
      description: '올때의 미친기운 안끝났어요... 오늘도 해안가 같이 달려요.',
      participants: 1,
      maxParticipants: 3,
    },
  ];

  return (
    <div className="search-crew">
      <h2>크루 찾기</h2>
      {crewData.map((crew, index) => (
        <SearchCrewCard key={index} {...crew} />
      ))}
    </div>
  );
};

export default SearchCrew;

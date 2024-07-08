// src/App.js
import React from 'react';
import CrewSection from './components/CrewSection';
import SearchCrew from './components/SearchCrew';
import './styles/App.css';

function App() {
  const crewData = [
    {
      image: '/images/image1.jpg',
      date: '2024년 9월 16일 (월)',
      title: '유니버셜 키치',
    },
    {
      image: '/images/image2.jpg',
      date: '2024년 9월 16일 (월)',
      title: '바르셀로나 사그라다 파밀리아',
    },
    {
      image: '/images/image3.jpg',
      date: '2024년 9월 16일 (월)',
      title: '스페인 요리 체험',
    },
    {
      image: '/images/image4.jpg',
      date: '2024년 9월 16일 (월)',
      title: '한국 요리 체험',
    },
  ];

  return (
    <div className="App">
      <CrewSection crewData={crewData} />
      <SearchCrew />
    </div>
  );
}

export default App;

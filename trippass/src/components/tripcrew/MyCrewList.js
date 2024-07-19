import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { TiDelete } from 'react-icons/ti';
import { API_URL } from '../../config';
import '../../styles/mycrewlist.css';

const MyCrewList = () => {
  const { user } = useSelector(state => state.user);
  const [crewData, setCrewData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const maxCards = 5; 



  useEffect(() => {
    setLoading(true); // 로딩 상태 시작
    const fetchMyCrew = async () => {
      try {
        const response = await axios.get(`${API_URL}/getMyCrew?tripId=${user.mainTrip}&userId=${user.userId}`);
        const crewData = response.data.response;
        setCrewData(crewData);
        setLoading(false); // 로딩 상태 종료
      } catch (error) {
        console.error('MyCrew 가져오기 실패:', error.message);
      }
    };

    if (user.mainTrip && user.userId) {
      fetchMyCrew();
    }
  }, [user.mainTrip, user.userId]);

  const scrollLeft = () => {
    setStartIndex(Math.max(startIndex - maxCards, 0)); 
  };

  const scrollRight = () => {
    setStartIndex(startIndex + maxCards); 
  };

  return (
    <div className="crewSection">
      <div className="section-title">
        <span>마이 크루</span>
        <div>
        <button className="scrollButton" onClick={scrollLeft}>
          &lt;
        </button>
        <button className="scrollButton" onClick={scrollRight}>
          &gt;
        </button>
        </div>
      </div>
      <div className="crewListContainer">
      {loading && ( 
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
        <div className="crewList">
          <ul className="crewCards">
            {crewData.slice(startIndex, startIndex + maxCards).map((crew, index) => (
              <li key={index} className="crewCard">
                <div className="crewCardImageWrapper">
                  <img src={`data:image/jpeg;base64,${crew.banner}`} alt={crew.title} />
                  <div className="crewCardOverlay">
                    <div className="crewCardInfo">
                      <div className="crewDate">{crew.date}</div>
                      <div className="crewTitle">{crew.title}</div>
                    </div>
                    <div className="deleteCrewButton"><TiDelete size={20} /></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyCrewList;
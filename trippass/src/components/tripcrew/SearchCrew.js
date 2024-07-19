import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../config';
import NewTripCrewPop from './NewTripCrewPop';
import { LuMapPin } from "react-icons/lu";
import { RiTeamLine } from "react-icons/ri";

const SearchCrew = () => {
  const { user } = useSelector(state => state.user);
  const [showPopup, setShowPopup] = useState(false);
  const [searchCrewData, setSearchCrewData] = useState([]);


  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        const response = await axios.get(`${API_URL}/getCrewCalc?mainTrip=${user.mainTrip}`);
        const crewData = response.data.response;
        const updatedCrewData = await Promise.all(crewData.map(async (crew) => {
          const tripMateList = crew.tripmate.split(',');
          const tripMateInfo = await Promise.all(tripMateList.map(async (userId) => {
            try {
              const userDataResponse = await axios.get(`${API_URL}/getUser`, {
                params: { userId }
              });
              return userDataResponse.data.response[0]; 
            } catch (error) {
              console.error(`유저 정보 가져오기 실패 (${userId}):`, error.message);
              return null;
            }
          }));
          return { ...crew, tripMateInfo: tripMateInfo.filter(info => info !== null) }; 
        }));
        setSearchCrewData(updatedCrewData);
      } catch (error) {
        console.error('크루 정보 및 트립메이트 정보 가져오기 실패:', error.message);
      }
    };

    if (user && user.mainTrip) {
      fetchCrewData();
    } 
  }, [user]);

  const handleJoinRequest = async (crewId) => {
    try {
      const formData = new FormData();
      formData.append('userId', user.userId);
      formData.append('tripId', user.mainTrip);
      formData.append('crewId', crewId);
      const response = await axios.post(`${API_URL}/insertJoinRequests`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('신청하기 결과:', response.data);
      alert('크루 가입 신청이 완료되었습니다');
    } catch (error) {
      alert('크루 가입 신청에 실패하였습니다.');
      console.error('신청하기 실패:', error.message);
    }
  };


  return (
    <>
      <div className='searchCrewSection'>
        <div className='section-title'>
          <span>크루 찾기</span>
          <div>
            <select>
              <option value="전체">전체</option>
              <option value="추천순">추천순</option>
            </select>
          </div>
        </div>
        <div className='searchCrewListContainer'>
          <div className="searchCrewList">
            <ul className="searchCrewCards">
              {searchCrewData.map((crew, index) => (
                <li key={index} className="searchCrewCard">
                  <div className="searchCrewCardImg">
                    <img src={`data:image/jpeg;base64,${crew.banner}`} alt={crew.title} />
                  </div>
                  <div className="searchCrewCardInfo">
                    <div className="searchCrewTitle">{crew.title}</div>
                    <div className="searchCrewDate">{crew.date} | {crew.time}</div>
                    <div className="searchCrewAddress"><LuMapPin />&nbsp;{crew.address}</div>
                    <div className="searchCrewNote">{crew.note}</div>
                    <div className="searchCrewNum"><RiTeamLine /> {crew.numOfMate}</div>
                  </div>
                  <div className="searchCrewCardMate">
                    <ul>
                      {crew.tripMateInfo && crew.tripMateInfo.map((userData, idx) => (
                        <li key={idx}>
                          <img src={`data:image/jpeg;base64,${userData.profileImage}`} alt={userData.nickname} className="profileImage" />
                          {userData.nickname}
                        </li>
                      ))}
                    </ul>
                    <div className="joinReqBtn" onClick={() => handleJoinRequest(crew.crewId)}>신청하기</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="newCrewButton" onClick={handlePopupOpen}>
        +
      </div>
      {showPopup && <NewTripCrewPop onClose={handlePopupClose} />}
    </>
  );
};

export default SearchCrew;

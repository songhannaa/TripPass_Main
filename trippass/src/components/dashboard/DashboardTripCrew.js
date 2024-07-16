
import "../../styles/dashboardtripcrew.css";
import React, { useEffect, useState } from "react";
import { FaAddressBook } from 'react-icons/fa'; 
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from '../../config'; // 올바른 경로로 수정하세요
import moment from "moment"; // 날짜 계산을 위한 라이브러리


const groupedPreferences = {
  money: [
    { id: 'money1', label: '넉넉한 게 최고!' },
    { id: 'money2', label: '아끼는 걸로' }
  ],
  food: [
    { id: 'food1', label: '웨이팅도 괜찮아' },
    { id: 'food2', label: '끌리는 대로' }
  ],
  transport: [
    { id: 'transport1', label: '터벅터벅' },
    { id: 'transport2', label: '무조건 택시' }
  ],
  schedule: [
    { id: 'schedule1', label: '즐기면서 천천히' },
    { id: 'schedule2', abel: '알차게 돌아다녀요' }
  ],
  photo: [
    { id: 'photo1', label: '눈으로 담자' },
    { id: 'photo2', label: '인생샷은 필수!' }
  ]
};

const keyTranslations = {
  money: '💵 경비',
  food: '🍽️ 음식',
  transport: '🚥 교통',
  schedule: '⏰ 일정',
  photo: '📷 사진'
};
const DashboardTripCrew = () => {
  const { user } = useSelector(state => state.user);
  const [crewData, setCrewData] = useState([]);
  const [currentCrewIndex, setCurrentCrewIndex] = useState(0);
  const [mateData, setMateData] = useState([]);

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        const response = await axios.get(`${API_URL}/getThisTripCrew`, {
          params: { tripId: user.mainTrip }
        });
        setCrewData(response.data.response);
      } catch (error) {
        console.error("Error fetching crew data:", error);
      }
    };

    if (user && user.mainTrip) {
      fetchCrewData();
    }
  }, [user]);

  useEffect(() => {
    const fetchMateData = async () => {
      if (crewData.length > 0) {
        const currentCrew = crewData[currentCrewIndex];
        if (currentCrew && currentCrew.tripmate) {
          const mateIds = currentCrew.tripmate.split(',');
          try {
            const responses = await Promise.all(mateIds.map(id => axios.get(`${API_URL}/getUser`, { params: { userId: id } })));
            const mates = responses.map(response => response.data.response[0]).filter(mate => mate.userId !== user.userId);
            setMateData(mates);
          } catch (error) {
            console.error("Error fetching mate data:", error);
          }
        }
      }
    };

    fetchMateData();
  }, [crewData, currentCrewIndex, user]);

  const handleNextCrew = () => {
    setCurrentCrewIndex((prevIndex) => (prevIndex + 1) % crewData.length);
  };

  const handlePrevCrew = () => {
    setCurrentCrewIndex((prevIndex) => (prevIndex - 1 + crewData.length) % crewData.length);
  };


  const getProfileImage = (mate) => {
    if (mate.profileImage) {
      return `data:image/png;base64,${mate.profileImage}`;
    }
    return mate.socialProfileImage;
  };

  const calculateAge = (birthDate) => {
    return moment().diff(birthDate, 'years');
  };

  const getPersonalityLabel = (type, id) => {
    const preference = groupedPreferences[type].find(pref => pref.id === id);
    return preference ? preference.label : '';
  };

  const currentCrew = crewData[currentCrewIndex];

  return (
    <div className="DashboardTripCrew_memo">
      <div className="DashboardTripCrew_memoTitle">
        <span>마이 트립 크루</span>
        <button className="DashboardTripCrew_editButton">
          <FaAddressBook />
        </button>
      </div>
      {currentCrew && (
        <div className="DashboardTripCrew_crewItem">
          <div className="DashboardTripCrew_bannerContainer">
            <img src={`data:image/png;base64,${currentCrew.banner}`} alt="Banner" className="DashboardTripCrew_crewBanner" />
            <div className="DashboardTripCrew_overlay">
              <div className="DashboardTripCrew_crewTitle">
                <p>{currentCrew.date} {currentCrew.time}</p>
                <p className="DashboardTripCrew_crewName">{currentCrew.title}</p>
              </div>
              <div className="DashboardTripCrew_navigation">
                <div className="DashboardTripCrew_Notifications">
                  <MdOutlineNotificationsNone size={22} />
                </div>
                <div className="DashboardTripCrew_Btn">
                  <button onClick={handlePrevCrew}>&lt;</button>
                  <button onClick={handleNextCrew}>&gt;</button>
                </div>
              </div>
            </div>
          </div>
          <div className="DashboardTripCrew_crewDescription">
            <h3>소개</h3>
            <p>{currentCrew.note}</p>
          </div>
          <div className="DashboardTripCrew_crewMates">
            <h3>마이 트립 메이트</h3>
            <div className="DashboardTripCrew_matesList">
              {mateData.length > 0 ? mateData.map((mate, idx) => (
                <div key={idx} className="DashboardTripCrew_mateItem">
                  <img src={getProfileImage(mate)} alt={mate.nickname} className="DashboardTripCrew_mateImage"/>
                  <div className="DashboardTripCrew_mateInfo">
                    <ul>
                      <li className="DashboardTripCrew_mateName">{mate.nickname}</li>
                      <li className="DashboardTripCrew_mateAge">{calculateAge(mate.birthDate)}세 {mate.sex}</li>
                      <li className="DashboardTripCrew_matePersonality">
                        <ul className="DashboardTripCrew_matePersonalityList">
                          {Object.keys(JSON.parse(mate.personality)).map((key, idx) => (
                            <li key={idx}>
                              <span className="DashboardTripCrew_matePersonalityKey">{keyTranslations[key]}</span>
                              &nbsp;&nbsp;{getPersonalityLabel(key, JSON.parse(mate.personality)[key])}
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </div> 
                </div>
              )) : <h3>트립 메이트가 없어요!</h3>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTripCrew;

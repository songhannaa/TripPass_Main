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
    { id: 'schedule2', label: '알차게 돌아다녀요' }
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
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sincheongInData, setSincheongInData] = useState([]);

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        const response = await axios.get(`${API_URL}/getThisTripCrew`, {
          params: { tripId: user.mainTrip }
        });
        setCrewData(response.data.response || []); // 데이터가 없을 경우 빈 배열로 초기화
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

    const fetchSincheongInData = async () => {
      if (crewData.length > 0) {
        const currentCrew = crewData[currentCrewIndex];
        if (currentCrew && currentCrew.crewId) {
          try {
            const response = await axios.get(`${API_URL}/getCrewSincheongIn`, {
              params: { crewId: currentCrew.crewId }
            });
            if (response.data['result code'] === 200) {
              setSincheongInData(response.data.response);
            } else {
              setSincheongInData([]);
            }
          } catch (error) {
            console.error("Error fetching sincheongIn data:", error);
            setSincheongInData([]);
          }
        }
      }
    };

    fetchMateData();
    fetchSincheongInData();
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

  const secondsToHHMM = (seconds) => {
    const date = new Date(seconds * 1000); // 초를 밀리초로 변환
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const mm = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  const currentCrew = crewData.length > 0 ? crewData[currentCrewIndex] : null;

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const handleNotificationClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="DashboardTripCrew_memo">
      <div className="DashboardTripCrew_memoTitle">
        <span>마이 트립 크루</span>
        <button className="DashboardTripCrew_editButton" onClick={toggleTooltip}>
          <FaAddressBook />
          {showTooltip && currentCrew && <a className="tooltip" href={currentCrew.contact} target="_blank" rel="noopener noreferrer">{currentCrew.contact}</a>}
        </button>
      </div>
      {currentCrew ? (
        <div className="DashboardTripCrew_crewItem">
          <div className="DashboardTripCrew_bannerContainer">
            <img src={`data:image/png;base64,${currentCrew.banner}`} alt="Banner" className="DashboardTripCrew_crewBanner" />
            <div className="DashboardTripCrew_overlay">
              <div className="DashboardTripCrew_crewTitle">
                <p>{currentCrew.date} {secondsToHHMM(currentCrew.time)}</p>
                <p className="DashboardTripCrew_crewName">{currentCrew.title}</p>
              </div>
              <div className="DashboardTripCrew_navigation">
                <div className="DashboardTripCrew_Notifications" onClick={handleNotificationClick}>
                  <MdOutlineNotificationsNone size={22} />
                  {sincheongInData.length > 0 && <span className="DashboardTripCrew_notificationDot"></span>}
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
      ) : (
        <div className="DashboardTripCrew_noCrew">
          <p>크루 데이터를 불러올 수 없습니다.</p>
        </div>
      )}
      {showModal && (
        <div className="DashboardTripCrew_modal">
          <div className="DashboardTripCrew_modalContent">
            <span className="DashboardTripCrew_close" onClick={closeModal}>&times;</span>
            <h2>크루 가입 요청</h2>
            <ul>
              {sincheongInData.map((person, idx) => (
                <li key={idx} className="DashboardTripCrew_sincheongInItem">
                  <img src={getProfileImage(person)} alt={person.nickname} className="DashboardTripCrew_mateImage"/>
                  <div className="DashboardTripCrew_sincheongInInfo">
                    <ul>
                      <li className="DashboardTripCrew_mateName">{person.nickname}</li>
                      <li className="DashboardTripCrew_mateAge">{calculateAge(person.birthDate)}세 {person.sex}</li>
                      <li className="DashboardTripCrew_matePersonality">
                        <ul className="DashboardTripCrew_matePersonalityList">
                          {Object.keys(JSON.parse(person.personality)).map((key, idx) => (
                            <li key={idx}>
                              <span className="DashboardTripCrew_matePersonalityKey">{keyTranslations[key]}</span>
                              &nbsp;&nbsp;{getPersonalityLabel(key, JSON.parse(person.personality)[key])}
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
            <div className="DashboardTripCrew_actions">
              <button className="DashboardTripCrew_acceptBtn">수락</button>
              <button className="DashboardTripCrew_rejectBtn">거절</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTripCrew;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/searchcrew.css'; // 스타일 파일을 가져오기
import { API_URL } from '../../config';

const CrewCard = ({ banner, date, time, title, address, note, members, crewId, userId, handleJoinRequest }) => {
  return (
    <div className="searchCrewCard">
      <img src={banner} alt="Crew Banner" className="searchCrewCardImage" />
      <div className="searchCrewCardContent">
        <p className="searchCrewCardDate">{date}</p>
        <h3>{title}</h3>
        <p className="searchCrewCardTime">{time}</p>
        <p className="searchCrewCardAddress">{address}</p>
        <p className="searchCrewCardNote">{note}</p>
        {/* <div className="searchCrewCardMembers">
          {members.map((member, index) => (
            <div key={index} className="searchCrewCardMember">
              <img src={member.profileImage ? `data:image/jpeg;base64,${member.profileImage}` : 'https://via.placeholder.com/40'} alt={member.nickname} />
              <div className="searchCrewCardMemberInfo">
                <p>{member.nickname}</p>
                <button className="viewPersonalityButton" data-personality={Array.isArray(member.personality) ? member.personality.join(', ') : member.personality}>성향 보기</button>
              </div>
            </div>
          ))}
        </div> */}
        {/* <button className="searchCrewCardButton" onClick={() => handleJoinRequest(crewId, userId)}>신청하기</button> */}
      </div>
      <div>
      <div className="searchCrewCardMembers">
          {members.map((member, index) => (
            <div key={index} className="searchCrewCardMember">
              <img src={member.profileImage ? `data:image/jpeg;base64,${member.profileImage}` : 'https://via.placeholder.com/40'} alt={member.nickname} />
              <div className="searchCrewCardMemberInfo">
                <p>{member.nickname}</p>
                <button className="viewPersonalityButton" data-personality={Array.isArray(member.personality) ? member.personality.join(', ') : member.personality}>성향 보기</button>
              </div>
            </div>
          ))}
        </div>
        <button className="searchCrewCardButton" onClick={() => handleJoinRequest(crewId, userId)}>신청하기</button>
      </div>
    </div>
  );
};

const SearchCrew = ({ userId }) => {
  const [crews, setCrews] = useState([]);
  const [filter, setFilter] = useState('전체');
  const [userInfo, setUserInfo] = useState({}); // 사용자 정보 저장

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/getUser`, {
          params: { userId }
        });
        const userData = response.data.response[0]; // Assuming response contains user data array
        setUserInfo(userData);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        let response;
        if (filter === '전체') {
          response = await axios.get(`${API_URL}/getCrewCalc`, {
            params: { mainTrip: userInfo.mainTrip }
          });
        } else if (filter === '추천순' && userInfo.mainTrip) {
          const mainTripResponse = await axios.get(`${API_URL}/getMyTrips`, {
            params: { tripId: userInfo.mainTrip }
          });
          const mainTrip = mainTripResponse.data.response[0];

          response = await axios.get(`${API_URL}/getCrewCalc`, {
            params: {
              mainTrip: mainTrip.tripId
            }
          });
        }

        const data = await Promise.all(response.data.response.map(async (crew) => {
          const date = crew.date || 'N/A'; // date가 없는 경우 기본값
          const time = crew.time ? formatTime(crew.time) : 'N/A'; // time이 없는 경우 기본값

          // Get crew members information
          const memberIds = crew.tripmate.split(',');
          const members = await Promise.all(memberIds.map(async (id) => {
            const memberResponse = await axios.get(`${API_URL}/getUser`, {
              params: { userId: id }
            });
            return memberResponse.data.response[0];
          }));

          return {
            banner: crew.banner ? `data:image/jpeg;base64,${crew.banner}` : 'https://via.placeholder.com/150',
            date: date,
            time: time,
            title: crew.title,
            address: crew.address,
            note: crew.note,
            members: members,
            crewId: crew.crewId,
            userId: crew.userId
          };
        }));

        setCrews(data);
      } catch (error) {
        console.error('Error fetching crew data:', error);
      }
    };

    if (userInfo.userId) {
      fetchCrewData();
    }
  }, [filter, userInfo]);

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleJoinRequest = async (crewId, userId) => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('crewId', crewId);
      formData.append('tripId', userInfo.mainTrip);

      const response = await axios.post(`${API_URL}/insertJoinRequests`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data['result code'] === 200) {
        alert("크루 신청이 완료되었습니다.");
      } else {
        alert(response.data.response);
      }
    } catch (error) {
      console.error('Error joining crew:', error);
      alert('크루 신청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="searchCrew">
      <div className="searchCrewHeader">
        <h2>크루 찾기</h2>
        <div className="crewFilterWrapper">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="searchCrewFilter"
          >
            <option value="전체">전체</option>
            <option value="추천순">추천순</option>
          </select>
        </div>
      </div>
      <div>
        {crews.map((crew, index) => (
          <CrewCard key={index} {...crew} handleJoinRequest={handleJoinRequest} />
        ))}
      </div>
    </div>
  );
};

export default SearchCrew;

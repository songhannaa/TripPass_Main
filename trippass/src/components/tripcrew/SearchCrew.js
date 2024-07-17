import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../../styles/searchcrew.css';
import { API_URL } from '../../config';

const CrewCard = ({ banner, date, time, title, address, note, members, crewId, userId, tripId }) => {
  const handleJoinRequestClick = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('crewId', crewId);
      formData.append('tripId', tripId);

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
    <div className="searchCrewCard">
      <img src={banner} alt="Crew Banner" className="searchCrewCardImage" />
      <div className="searchCrewCardContent">
        <p className="searchCrewCardDate">{date}</p>
        <h3>{title}</h3>
        <p className="searchCrewCardTime">{time}</p>
        <p className="searchCrewCardAddress">{address}</p>
        <p className="searchCrewCardNote">{note}</p>
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
        <button className="searchCrewCardButton" onClick={handleJoinRequestClick}>신청하기</button>
      </div>
    </div>
  );
};

const SearchCrew = () => {
  const user = useSelector((state) => state.user.user);
  const [crews, setCrews] = useState([]);
  const [filter, setFilter] = useState('전체');

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        let response;
        if (filter === '전체') {
          response = await axios.get(`${API_URL}/getCrewCalc`, { params: { mainTrip: user.mainTrip } });
        } else if (filter === '추천순') {
          response = await axios.get(`${API_URL}/getCrewCalc`, { params: { mainTrip: user.mainTrip } });
        }

        const data = await Promise.all(response.data.response.map(async (crew) => {
          const date = crew.date || 'N/A';
          const time = crew.time ? formatTime(crew.time) : 'N/A';

          const memberIds = crew.tripmate.split(',');
          const members = await Promise.all(memberIds.map(async (id) => {
            const memberResponse = await axios.get(`${API_URL}/getUser`, { params: { userId: id } });
            return memberResponse.data.response[0];
          }));

          return {
            banner: crew.banner ? `data:image/jpeg;base64,${crew.banner}` : 'https://via.placeholder.com/150',
            date,
            time,
            title: crew.title,
            address: crew.address,
            note: crew.note,
            members,
            crewId: crew.crewId,
            userId: crew.userId,
            tripId: crew.tripId
          };
        }));

        setCrews(data);
      } catch (error) {
        console.error('Error fetching crew data:', error);
      }
    };

    if (user?.userId) {
      fetchCrewData();
    }
  }, [filter, user]);

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
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
          <CrewCard key={index} {...crew} userId={user.userId} />
        ))}
      </div>
    </div>
  );
};

export default SearchCrew;

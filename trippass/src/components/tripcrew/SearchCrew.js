import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import '../../styles/searchcrew.css';
import { API_URL } from '../../config';
import { fetchCrews } from '../../store/tripSlice';

const CrewCard = ({ banner, date, time, title, address, note, members, crewId, userId, tripId, tripmate, numOfMate }) => {
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

  const bannerSrc = banner ? `data:image/jpeg;base64,${banner}` : 'https://via.placeholder.com/150';

  return (
    <div className="searchCrewCard">
      <img src={bannerSrc} alt="Crew Banner" className="searchCrewCardImage" />
      <div className="searchCrewCardContent">
        <p className="searchCrewCardDate">{date}</p>
        <h3>{title}</h3>
        <p className="searchCrewCardTime">{time}</p>
        <p className="searchCrewCardAddress">{address}</p>
        <p className="searchCrewCardNote">{note}</p>
        <div className="searchCrewCardMembers">
          {members && members.map((member, index) => (
            <div key={index} className="searchCrewCardMember">
              <img src={member.profileImage ? `data:image/jpeg;base64,${member.profileImage}` : 'https://via.placeholder.com/40'} alt={member.nickname} />
              <div className="searchCrewCardMemberInfo">
                <p>{member.nickname}</p>
                <button className="viewPersonalityButton" data-personality={Array.isArray(member.personality) ? member.personality.join(', ') : member.personality}>성향 보기</button>
              </div>
            </div>
          ))}
        </div>
        <p className="searchCrewCardMembersCount">{tripmate.split(',').length}/{numOfMate}</p>
        <button className="searchCrewCardButton" onClick={handleJoinRequestClick} disabled={tripmate.split(',').length >= numOfMate}>신청하기</button>
      </div>
    </div>
  );
};

const SearchCrew = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { crews = [], status } = useSelector((state) => state.trip);
  const [filter, setFilter] = useState('전체');

  useEffect(() => {
    if (user?.mainTrip) {
      dispatch(fetchCrews(user.mainTrip));
    }
  }, [dispatch, user]);

  useEffect(() => {
    console.log('User:', user);
    console.log('Crews:', crews);
    console.log('Status:', status);
  }, [user, crews, status]);

  const filteredCrews = crews.filter(crew => {
    if (filter === '전체') {
      return crew.tripmate.split(',').length < crew.numOfMate; // 인원이 다 찬 크루는 제외
    }
    return true;
  });

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
        {filteredCrews.map((crew, index) => (
          <CrewCard key={index} {...crew} userId={user.userId} />
        ))}
      </div>
    </div>
  );
};

export default SearchCrew;

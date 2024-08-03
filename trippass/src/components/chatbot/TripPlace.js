import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from 'react-redux';
import { FcCalendar } from "react-icons/fc";
import axios from 'axios';
import { API_URL } from "../../config";
import NewTripPlacePop from './NewTripPlanPopup';
import { IoIosRemoveCircle } from "react-icons/io";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";



const TripPlace = () => {
  const { user } = useSelector(state => state.user);
  const trip = useSelector(state => state.trip.trip);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tripInfo, setTripInfo] = useState([]);


  const fetchTripPlaceInfo = useCallback(async () => {
    try {
      const tripResponse = await axios.get(`${API_URL}/getSavePlace`, {
        params: { userId: user.userId, tripId: user.mainTrip }
      });
      if (tripResponse.data['result_code'] === 200) {
        const updatedTripInfo = tripResponse.data.response.flat().map(place => ({
          place: place.title,
          address: place.address,
          latitude: place.latitude,
          longitude: place.longitude,
          description: place.description
        }));
        setTripInfo(updatedTripInfo);
      } else if(tripResponse.data['result_code'] === 404 || tripResponse.data['result_code'] === 400) {
        setTripInfo([]);
      }
      else {
        console.error('Failed to fetch trip data:', tripResponse.data);
      }
    } catch (error) {
      console.error('Error fetching trip data:', error);
    }
  }, [user.userId, user.mainTrip]);

  useEffect(() => {
    if (user.mainTrip) {
      fetchTripPlaceInfo();
    }
  }, [user.userId, user.mainTrip,fetchTripPlaceInfo]);

  useEffect(() => {
    if (trip === "save_place" || trip === "save_plan" || trip === "search_place_details") {
      fetchTripPlaceInfo();
    }
  }, [trip, fetchTripPlaceInfo]);

  const handlePopupOpen = (placeInfo) => {
    setSelectedPlace(placeInfo);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedPlace(null);
  };


  
  const handleDeleteClick = async (place) => {
    const confirmDelete = window.confirm(`${place.place} 장소를 삭제하시겠습니까?`);
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/deletePlaceData/${user.mainTrip}/${place.place}`);
        fetchTripPlaceInfo();
      } catch (error) {
        console.error('Error deleting place data:', error);
      }
    }
  };
  


  return (
    <>
      <div className="tripPlaceSection">
         <div className="tripPlaceTitle">
          {user.nickname}님의 목적지&nbsp;&nbsp;
          <HiMiniQuestionMarkCircle 
            color="#808080" 
            size={20} 
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          />
          {isHovered && (
            <div className="trip_place_hoverPopup">
              채팅으로 저장한 장소들을 이용해 일정을 만들어 드려요! 
            </div>
          )}

        </div>
        <div className="tripPlaceContent">
          <ul>
            {tripInfo && tripInfo.map((info, index) => (
              <li key={index}>
                <div className="tripPlaceName">
                  {info.place}
                </div>
                <div className="tripPlaceCalendar">
                  <FcCalendar onClick={() => handlePopupOpen(info)} size={22} /> &nbsp;&nbsp;
                  <IoIosRemoveCircle onClick={() => handleDeleteClick(info)} color="#ff6666" size={22} />
                </div>
                {showPopup && selectedPlace && <NewTripPlacePop onClose={handlePopupClose} placeInfo={selectedPlace}/>}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </>
  );
};

export default TripPlace;
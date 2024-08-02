import React, { useState, useEffect } from "react";
import { useSelector ,useDispatch} from 'react-redux';
import { FcCalendar } from "react-icons/fc";
import axios from 'axios';
import { API_URL } from "../../config";
import NewTripPlacePop from './NewTripPlanPopup';
import { IoIosRemoveCircle } from "react-icons/io";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { deleteTrip } from "../../store/tripSlice";


const TripPlace = () => {
  const { user } = useSelector(state => state.user);
  const trip = useSelector(state => state.trip.trip);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tripInfo, setTripInfo] = useState([]);
  const dispatch = useDispatch();

  const fetchTripPlaceInfo = async () => {
    try {
      const tripResponse = await axios.get(`${API_URL}/getSavePlace`, {
        params: { userId: user.userId, tripId: user.mainTrip }
      });

      if (tripResponse.data['result_code'] === 200) {
        const updatedTripInfo = tripResponse.data.response.map(place => ({
          place: place.title,
          address: place.address,
          latitude: place.latitude,
          longitude: place.longitude,
          description: place.description
        }));
        setTripInfo(updatedTripInfo);
      } else {
        console.error('Failed to fetch trip data:', tripResponse.data);
      }
    } catch (error) {
      console.error('Error fetching trip data:', error);
    }
  };


  useEffect(() => {
    fetchTripPlaceInfo();
  }, [user.userId, user.mainTrip]);

  useEffect(() => {
    if (trip === "save_place") {
      fetchTripPlaceInfo();
      dispatch(deleteTrip());
    }
  }, [trip]);

  const handlePopupOpen = (placeInfo) => {
    setSelectedPlace(placeInfo);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedPlace(null);
  };

  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
    setPlaceToDelete(null);
  };
  
  const handleDeleteClick = async (place) => {
    const confirmDelete = window.confirm(`${place.place} 장소를 삭제하시겠습니까?`);
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/deletePlaceData/${user.mainTrip}/${place.place}`);
        setTripInfo(tripInfo.filter(info => info.place !== place.place));
      } catch (error) {
        console.error('Error deleting place data:', error);
      }
    }
  };
  
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_URL}/deletePlaceData/${user.mainTrip}/${placeToDelete.place}`);
      setTripInfo(tripInfo.filter(info => info.place !== placeToDelete.place));
    } catch (error) {
      console.error('Error deleting place data:', error);
    }
    setShowDeletePopup(false);
    setPlaceToDelete(null);
  };

  return (
    <>
      <div className="tripPlaceSection">

         <div className="tripPlaceTitle">
          &nbsp;&nbsp;{user.nickname}의 목적지&nbsp;&nbsp;
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

      {showDeletePopup && (
        <div className="deletePopup">
          <div className="deletePopupContent">
            <p>{`'${placeToDelete.place}' 장소를 삭제하시겠습니까?`}</p>
            <button onClick={handleDeleteConfirm}>삭제</button>
            <button onClick={handleDeleteCancel}>취소</button>
          </div>
        </div>
      )}

    </>
  );
};

export default TripPlace;

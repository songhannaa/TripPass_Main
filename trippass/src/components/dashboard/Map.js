import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../../config';

// 기본 마커 아이콘 경로 설정
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const defaultMarker = { id: 1, position: [37.5759, 126.9768], popupText: "여행을 떠나볼까요?" };

const Map = () => {
  const { user } = useSelector(state => state.user);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    const fetchTripPlans = async () => {
      try {
        const response = await axios.get(`${API_URL}/getTripPlans?tripId=${user.mainTrip}`);
        if (response.data['result code'] === 200) {
          const plans = response.data.response;
          const markersData = plans.map(plan => ({
            id: plan.planId,
            position: [plan.latitude, plan.longitude],
            title: plan.title,
            place: plan.place,
            popupText: `${plan.title} - ${plan.place}`,
            date: plan.date
          }));

          if (markersData.length > 0) {
            setCenter(markersData[0].position); // 첫 번째 마커의 위치로 중심 설정
            setMarkers(markersData);
          } else {
            setMarkers([defaultMarker]);
            setCenter(defaultMarker.position);
          }
        } else {
          console.error('Failed to fetch trip plans:', response.data);
        }
      } catch (error) {
        console.error('Error fetching trip plans:', error);
      }
    };

    if (user.mainTrip) {
      fetchTripPlans();
    }
  }, [user.mainTrip]);

  if (!center) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map(marker => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>{marker.popupText}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

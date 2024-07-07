import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// 기본 마커 아이콘 경로 설정
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 마커 데이터
const markers = [
  { id: 1, position: [51.505, -0.09], popupText: "Marker 1" },
  { id: 2, position: [51.515, -0.1], popupText: "Marker 2" },
  { id: 3, position: [51.525, -0.12], popupText: "Marker 3" },
];

// 경로 데이터
const polylinePoints = [
  [51.505, -0.09],
  [51.515, -0.1],
  [51.525, -0.12],
];

const Map = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map(marker => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>{marker.popupText}</Popup>
        </Marker>
      ))}
      <Polyline positions={polylinePoints} color="blue" />
    </MapContainer>
  );
};

export default Map;

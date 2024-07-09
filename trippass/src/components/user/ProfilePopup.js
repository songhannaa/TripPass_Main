// src/components/Popup.js
import React, { useState } from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Popup = ({ onClose, onSave }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    onSave(file);
    onClose();
  };

  return (
    <PopupContainer>
      <PopupContent>
        <h2>프로필 사진 변경</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSave}>저장</button>
        <button onClick={onClose}>취소</button>
      </PopupContent>
    </PopupContainer>
  );
};

export default Popup;

// src/components/ProfilePopup.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateProfileImageAsync } from '../../store/userSlice';

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

const ProfilePopup = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreview(previewURL);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (file && user) {
      dispatch(updateProfileImageAsync(user.userId, file));
      onClose(); 
    }
  };

  return (
    <PopupContainer>
      <PopupContent>
        <div className="new-trip-title">프로필 사진 변경</div>
        <form className="new-trip-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label>이미지</label>
            <input type="file" className='fileInput' accept="image/*" onChange={handleFileChange} />
          </div>
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="미리보기" />
            </div>
          )}
          <div className="form-group btnList">
            <button type="submit">저장</button>
            <button type="button" onClick={onClose}>닫기</button>
          </div>
        </form>
      </PopupContent>
    </PopupContainer>
  );
};

export default ProfilePopup;
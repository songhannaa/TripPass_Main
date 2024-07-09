// userSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: null,
  isAuthenticated: !!localStorage.getItem('user')
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('user');
    },
    updateProfileImage(state, action) {
      if (state.user) {
        state.user.profileImage = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  }
});

export const { loginSuccess, loginFailure, logout, updateProfileImage } = userSlice.actions;

// 수정된 부분: 이미지 업데이트 후 사용자 데이터 다시 가져오기
export const updateProfileImageAsync = (userId, file) => async dispatch => {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('profileImage', file);

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/updateUserProfileImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if (response.data.result_code === 200) {
      // 이미지 업데이트 성공 시 새로운 사용자 데이터 가져오기
      const userDataResponse = await axios.get(`${process.env.REACT_APP_API_URL}/getUserData/${userId}`);
      dispatch(updateProfileImage(userDataResponse.data.profileImage)); // 예시: 실제로는 사용자 데이터 전체를 업데이트해야 함
    } else {
      console.error('Error updating profile image:', response.data.response);
    }
  } catch (error) {
    console.error('Error updating profile image:', error);
  }
};

export default userSlice.reducer;

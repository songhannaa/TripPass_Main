// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../config';

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
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
    },
    updateUserData(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    }
  }
});

export const { loginSuccess, loginFailure, logout, updateProfileImage, updateUserData } = userSlice.actions;

export const fetchUserData = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/getUser?=${userId}`);
    dispatch(updateUserData(response.data));
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const updateProfileImageAsync = (userId, file) => async dispatch => {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('profileImage', file);

  try {
    const response = await axios.post(`${API_URL}/updateUserProfileImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // Adjust the condition based on actual response structure
    if (response.data['result code'] === 200) {
      const userDataResponse = await axios.get(`${API_URL}/getUser?=${userId}`);
      dispatch(updateProfileImage(userDataResponse.data)); 
    } else {
      console.error('Error updating profile image:', response.data.response);
    }
  } catch (error) {
    console.error('Error updating profile image:', error);
  }
};

export default userSlice.reducer;

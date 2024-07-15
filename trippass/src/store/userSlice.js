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
      if (state.user) {
        state.user.profileImage = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    updateUserMainTrip(state, action) {
      if (state.user) {
        state.user.mainTrip = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    setUserPersonality(state, action) {
      if (state.user) {
        state.user.personality = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  }
});

export const { loginSuccess, loginFailure, logout, updateProfileImage, updateUserMainTrip, setUserPersonality,updateUserData } = userSlice.actions;

export const updateMainTripAsync = (userId, tripId) => async dispatch => {
  try {
    const response = await axios.post(`${API_URL}/updateUserMainTrip`, {
      userId,
      mainTrip: tripId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data['result code'] === 200) {
      dispatch(updateUserMainTrip(tripId));
    } else {
      console.error('Failed to update main trip:', response.data);
    }
  } catch (error) {
    console.error('Error updating main trip:', error);
  }
};

export const updatePersonality = (userId, personality) => async dispatch => {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('personality', personality);

    const response = await axios.post(`${API_URL}/updateUserPersonality`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.data['result code'] === 200) {
      dispatch(setUserPersonality(personality));
    } else {
      console.error('Failed to update personality:', response.data);
    }
  } catch (error) {
    console.error('Error updating personality:', error);
  }
};

export default userSlice.reducer;

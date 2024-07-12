// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

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
    updateUserMainTrip(state, action) {
      if (state.user) {
        state.user.mainTrip = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  }
});


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

export default userSlice.reducer;

// src/store/tripSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../config';

// 초기 상태 정의
const initialState = {
  trips: [],
  // crews: [],
  status: 'idle',
  error: null,
};

// 비동기 함수 예제 (필요에 따라 사용할 수 있습니다)
export const fetchTrips = createAsyncThunk(
  'trip/fetchTrips',
  async (userId, thunkAPI) => {
    const response = await axios.get(`${API_URL}/getMyTrips`, { params: { userId } });
    return response.data.response;
  }
);

// 슬라이스 정의
const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setTrips(state, action) {
      state.trips = action.payload;
    },
    setCrews(state, action) {
      state.crews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trips = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setTrips, setCrews } = tripSlice.actions;

export default tripSlice.reducer;

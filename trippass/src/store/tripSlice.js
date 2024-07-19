import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../config';

const initialState = {
  crews: [],
  trips: [],
  status: 'idle',
  error: null,
};

// 크루 정보 가져오기
export const fetchCrews = createAsyncThunk(
  'trip/fetchCrews',
  async (tripId, thunkAPI) => {
    const response = await axios.get(`${API_URL}/getCrewCalc`, { params: { mainTrip: tripId } });
    const crews = response.data.response;
    
    // 각 크루의 멤버 정보 가져오기
    const crewsWithMembers = await Promise.all(crews.map(async (crew) => {
      const tripmates = crew.tripmate ? crew.tripmate.split(',') : [];
      const members = await Promise.all(tripmates.map(async (userId) => {
        const userResponse = await axios.get(`${API_URL}/getUser`, { params: { userId } });
        return userResponse.data.response[0];
      }));
      return { ...crew, members };
    }));

    return crewsWithMembers;
  }
);

// 여행 정보 가져오기
export const fetchTrips = createAsyncThunk(
  'trip/fetchTrips',
  async (userId, thunkAPI) => {
    const response = await axios.get(`${API_URL}/getMyTrips`, { params: { userId } });
    return response.data.response;
  }
);

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
      .addCase(fetchCrews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCrews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.crews = action.payload;
      })
      .addCase(fetchCrews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
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

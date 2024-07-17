import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tripReducer from './tripSlice'; // 지영 - 추가

const store = configureStore({
  reducer: {
    user: userReducer,
    trip: tripReducer, // 지영 - 추가
  },
});
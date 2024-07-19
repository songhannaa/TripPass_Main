import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tripReducer from './tripSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    trip: tripReducer,
  },
});
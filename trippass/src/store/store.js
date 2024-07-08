import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    // 다른 리듀서들 추가 가능
  },
});

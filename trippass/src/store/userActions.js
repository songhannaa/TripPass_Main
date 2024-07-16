import axios from 'axios';
import { API_URL } from '../config';
import { setUserPersonality } from './userSlice';

export const updatePersonality = (userId, personality) => {
  return async (dispatch) => {
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
};

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tripPlace: sessionStorage.getItem('tripPlace') || null
};

const tripSlice = createSlice({
  name: 'tripPlace',
  initialState,
  reducers: {
    updateTripPlace() {
      sessionStorage.setItem('tripPlace', "update");
    },
    deleteTripPlace(){
      sessionStorage.setItem('tripPlace', null);
    }
}
});

export const { updateTripPlace, deleteTripPlace } = tripSlice.actions;

export default tripSlice.reducer;

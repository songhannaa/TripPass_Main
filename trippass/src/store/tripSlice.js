import { SET_TRIP_PLANS, ADD_TRIP_PLAN } from './tripActions';

const initialState = {
  tripPlans: [],
};

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRIP_PLANS:
      return {
        ...state,
        tripPlans: action.payload,
      };
    case ADD_TRIP_PLAN:
      return {
        ...state,
        tripPlans: [...state.tripPlans, action.payload],
      };
    default:
      return state;
  }
};

export default tripReducer;

export const SET_TRIP_PLANS = 'SET_TRIP_PLANS';
export const ADD_TRIP_PLAN = 'ADD_TRIP_PLAN';

export const setTripPlans = (plans) => ({
  type: SET_TRIP_PLANS,
  payload: plans,
});

export const addTripPlan = (plan) => ({
  type: ADD_TRIP_PLAN,
  payload: plan,
});

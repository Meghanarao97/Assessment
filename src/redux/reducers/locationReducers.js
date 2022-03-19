import { ActionTypes } from "../contants/actionType";
const initialState = {
  location: [],
};
export const locationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_LOCATIONLIST:
      return { ...state, location: payload };
    default:
      return state;
  }
};

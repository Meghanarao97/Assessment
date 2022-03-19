import { ActionTypes } from "../contants/actionType";

export const setlocation = (locations) => {
  return {
    type: ActionTypes.SET_LOCATIONLIST,
    payload: locations,
  };
};

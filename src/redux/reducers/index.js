import { combineReducers } from "redux";
import { locationReducer } from "./locationReducers";

const reducer = combineReducers({
  product: locationReducer,
});
export default reducer;

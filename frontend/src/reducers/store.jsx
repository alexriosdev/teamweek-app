import { createStore, combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  userState: userReducer,
});

const store = createStore(rootReducer);

export default store;

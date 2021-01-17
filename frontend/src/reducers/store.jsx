import { createStore, combineReducers } from "redux";
import userReducer from "./userReducer";
import scheduleReducer from "./scheduleReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  scheduleState: scheduleReducer,
});

const store = createStore(rootReducer);

export default store;

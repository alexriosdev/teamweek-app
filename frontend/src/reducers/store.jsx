import { createStore, combineReducers } from "redux";
import userReducer from "./userReducer";
import scheduleReducer from "./scheduleReducer";
import organizationReducer from "./organizationReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  scheduleState: scheduleReducer,
  organizationState: organizationReducer,
});

const store = createStore(rootReducer);

export default store;

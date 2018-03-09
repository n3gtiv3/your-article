import { combineReducers } from 'redux';
import Dashboard from "./dashboard";
import Summary from "./summary";

const rootReducer = combineReducers({
  Dashboard,
  Summary
});

export default rootReducer;

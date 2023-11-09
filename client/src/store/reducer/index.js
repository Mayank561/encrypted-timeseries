import { combineReducers } from "redux";
import { processReducer } from "./process";
const rootReducers = combineReducers({
    processReducer: processReducer,
});
export default rootReducers;
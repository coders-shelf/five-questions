import { combineReducers } from "redux";
import subjects from "./subjects";
import uiState from "./uiState";
import auth from "./auth";

const rootReducer = combineReducers({ subjects, uiState, auth });

export default rootReducer;

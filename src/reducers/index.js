import { combineReducers } from "redux";
import subjects from "./subjects";
import uiState from "./uiState";

const rootReducer = combineReducers({ subjects, uiState });

export default rootReducer;

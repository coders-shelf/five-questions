import * as ACTION_TYPES from "./actionTypes";
import { hideBackdrop } from "./uiState";
// import axios from "../axios";

export const apiFailed = message => dispatch => {
  dispatch(hideBackdrop());
  return {
    type: ACTION_TYPES.API_FAILED,
    payload: {
      message: message
    }
  };
};

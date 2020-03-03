import * as ACTION_TYPES from "./actionTypes";
import { hideBackdrop, showMessage } from "./uiState";
// import axios from "../axios";

export const apiFailed = message => dispatch => {
  dispatch(hideBackdrop());
  dispatch(showMessage(message, "error"));
  return {
    type: ACTION_TYPES.API_FAILED,
    payload: {
      message: message
    }
  };
};

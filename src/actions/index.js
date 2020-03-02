import * as ACTION_TYPES from "./actionTypes";
// import axios from "../axios";

export const apiFailed = message => {
  return {
    type: ACTION_TYPES.API_FAILED,
    payload: {
      message: message
    }
  };
};

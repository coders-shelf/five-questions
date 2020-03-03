import * as ACTION_TYPES from "../actions/actionTypes";

export const showBackdrop = () => {
  console.log("backdrop");
  return {
    type: ACTION_TYPES.SHOW_BACKDROP
  };
};

export const hideBackdrop = () => {
  return {
    type: ACTION_TYPES.HIDE_BACKDROP
  };
};

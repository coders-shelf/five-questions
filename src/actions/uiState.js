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

export const showMessage = (message, type) => {
  return {
    type: ACTION_TYPES.SHOW_MESSAGE,
    payload: { message: message, messageType: type }
  };
};

export const hideMessage = () => {
  return {
    type: ACTION_TYPES.HIDE_MESSAGE
  };
};

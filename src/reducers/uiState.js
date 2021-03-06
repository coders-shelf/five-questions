import * as ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  showBackdrop: false,
  showMessage: false,
  message: "", // snackbarに表示する内容
  messageType: "success" // success, info, warning, errorの中から選択
};

const uiState = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SHOW_BACKDROP:
      return {
        ...state,
        showBackdrop: true
      };
    case ACTION_TYPES.HIDE_BACKDROP:
      return {
        ...state,
        showBackdrop: false
      };
    case ACTION_TYPES.SHOW_MESSAGE:
      return {
        ...state,
        showMessage: true,
        message: action.payload.message,
        messageType: action.payload.messageType
      };
    case ACTION_TYPES.HIDE_MESSAGE:
      return {
        ...state,
        showMessage: false,
        message: ""
      };
    default:
      return state;
  }
};

export default uiState;

import * as ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  showBackdrop: false,
  showMessage: false
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
    default:
      return state;
  }
};

export default uiState;

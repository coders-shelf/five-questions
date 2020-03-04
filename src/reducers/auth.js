import * as ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  isAuth: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SIGN_IN:
      return {
        ...state,
        isAuth: true
      };
    case ACTION_TYPES.SIGN_OUT:
      return {
        ...state,
        isAuth: false
      };
    default:
      return state;
  }
};

export default auth;

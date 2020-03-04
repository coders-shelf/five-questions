import * as ACTION_TYPES from "../actions/actionTypes";
import axiosAuth from "../axios/axiosAuth";
import { apiKey } from "../utils/setting";
import { apiFailed } from "./index";
import { showBackdrop, showMessage } from "./uiState";
import {
  saveAuthTokens,
  removeAuthTokens,
  getItem,
  isExpired
} from "../utils/tokenUtils";

export const authenticate = (isSignUp, data) => async dispatch => {
  dispatch(showBackdrop());
  let param;
  let messageString;
  if (isSignUp) {
    // Sign Up
    param = "accounts:signUp";
    messageString = "ユーザ登録";
  } else {
    // Sign In
    param = "accounts:signInWithPassword";
    messageString = "サインイン";
  }
  try {
    data.returnSecureToken = true;
    const result = await axiosAuth.post(param + "?key=" + apiKey, data);
    if (result.status === 200) {
      saveAuthTokens(
        result.data.idToken,
        result.data.localId,
        result.data.expiresIn
      );
      dispatch(signinSuccess());
      dispatch(showMessage(messageString + "に成功しました。", "success"));
    } else {
      dispatch(
        apiFailed(messageString + "に失敗しました。もう一度やり直して下さい。")
      );
    }
  } catch (error) {
    dispatch(apiFailed(messageString + "に失敗しました。"));
  }
};

export const signout = () => {
  removeAuthTokens();
  return {
    type: ACTION_TYPES.SIGN_OUT
  };
};

const signinSuccess = () => {
  return {
    type: ACTION_TYPES.SIGN_IN
  };
};

export const checkToken = () => dispatch => {
  const token = getItem("token");
  if (!token) {
    dispatch(signout());
  } else if (isExpired()) {
    dispatch(signout());
    dispatch(
      showMessage(
        "認証の期限が切れました。もう一度ログインして下さい。",
        "error"
      )
    );
  } else {
    dispatch(signinSuccess());
  }
};

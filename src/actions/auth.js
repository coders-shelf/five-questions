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

/**
 * ユーザの新規登録とログインを行う
 * @param {Boolean} isSignUp - 新規登録であればtrue, ログインであればfalse
 * @param {Object} data - email, passwordを含む
 */
export const authenticate = (isSignUp, data) => async dispatch => {
  dispatch(showBackdrop());
  let param;
  let messageString;
  if (isSignUp) {
    // Sign Up
    // ユーザ新規登録の通信先
    param = "accounts:signUp";
    messageString = "ユーザ登録";
  } else {
    // Sign In
    // ユーザログインの通信先
    param = "accounts:signInWithPassword";
    messageString = "サインイン";
  }
  try {
    data.returnSecureToken = true;
    const result = await axiosAuth.post(param + "?key=" + apiKey, data);
    if (result.status === 200) {
      // 認証に成功した場合はトークンを保存する
      saveAuthTokens(
        result.data.idToken,
        result.data.localId,
        result.data.expiresIn
      );
      dispatch(signinSuccess()); // アクションの生成
      dispatch(showMessage(messageString + "に成功しました。", "success")); // 成功のメッセージを表示
    } else {
      // 認証に失敗した場合はエラーメッセージを表示する
      dispatch(
        apiFailed(messageString + "に失敗しました。もう一度やり直して下さい。")
      );
    }
  } catch (error) {
    // 通信が失敗した場合もエラーメッセージを表示する
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

/**
 * トークンが存在するか、もしくはトークンの期限切れを確認
 */
export const checkToken = () => dispatch => {
  const token = getItem("token");
  if (!token) {
    // トークンが存在しなければサインアウトさせる
    dispatch(signout());
  } else if (isExpired()) {
    // 「トークンが存在するが、期限切れ」の場合はメッセージを表示し、サインアウトさせる
    dispatch(signout());
    dispatch(
      showMessage(
        "認証の期限が切れました。もう一度ログインして下さい。",
        "error"
      )
    );
  } else {
    // トークンが存在し、期限切れでない場合はログイン状態にする
    dispatch(signinSuccess());
  }
};

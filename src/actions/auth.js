import * as ACTION_TYPES from "../actions/actionTypes";
import { apiFailed } from "./index";
import { showBackdrop, hideBackdrop, showMessage } from "./uiState";
import firebase from "../firebase/firebase";

/**
 * ユーザの新規登録とログインを行う
 * @param {Boolean} isSignUp - 新規登録であればtrue, ログインであればfalse
 * @param {Object} data - email, passwordを含む
 */
export const authenticate = (isSignUp, data) => async dispatch => {
  dispatch(showBackdrop());
  const messageString = isSignUp ? "ユーザ登録" : "サインイン";
  try {
    if (isSignUp) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
    } else {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
    }
    dispatch(signinSuccess()); // アクションの生成
    dispatch(showMessage(messageString + "に成功しました。", "success")); // 成功のメッセージを表示
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // 通信が失敗した場合もエラーメッセージを表示する
    dispatch(apiFailed(messageString + "に失敗しました。コード" + errorCode));
  }
};

export const signout = () => async dispatch => {
  try {
    await firebase.auth().signOut();
    dispatch(showMessage("サインアウトに成功しました。", "success"));
    dispatch(signoutSuccess());
  } catch (error) {
    console.log(error);
  }
};

const signoutSuccess = () => {
  return {
    type: ACTION_TYPES.SIGN_OUT
  };
};

const signinSuccess = () => {
  return {
    type: ACTION_TYPES.SIGN_IN
  };
};

export const checkUser = () => dispatch => {
  dispatch(showBackdrop());
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(signinSuccess());
    } else {
      // No user is signed in.
      dispatch(hideBackdrop());
    }
  });
};

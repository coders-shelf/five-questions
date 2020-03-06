import * as ACTION_TYPES from "./actionTypes";
import { apiFailed } from "./index";
import { qas } from "../utils/initialQuestions";
import { showMessage } from "./uiState";
import firebase from "../firebase/firebase";

export const createInitialQuestion = id => async dispatch => {
  try {
    /*
        メソッドはpatchでなければならない。
        postにした場合は u-id: { value }の形で保存されるため
        axios.post("/qa.json", { [id]: qas })とすると
        u-id: {
            id: {
                value
            }
        }
        という1階層深い形になる。
        axios.post("/qa/${id}.json", { qas })とすると
        id: {
            u-id: {
                value
            }
        }
        となる
        putの場合は目的通りの形になるが、データを追加すると古いデータが上書き消去されてしまう。
        そのためpatchである必要がある。
       */
    const userId = firebase.auth().currentUser.uid;
    await firebase
      .database()
      .ref(`${userId}/qa/${id}`)
      .update(qas);
  } catch (error) {
    dispatch(apiFailed("create initial question failed"));
  }
};

export const updateQuestionAnswers = (id, data) => async dispatch => {
  try {
    const userId = firebase.auth().currentUser.uid;
    await firebase
      .database()
      .ref(`${userId}/qa/${id}`)
      .update(data);
    dispatch(updateQuestionAnswersSuccess());
    dispatch(showMessage("保存に成功しました。", "success"));
  } catch (error) {
    dispatch(apiFailed("update question failed"));
  }
};

const updateQuestionAnswersSuccess = () => {
  return {
    type: ACTION_TYPES.UPDATE_QUESTION_ANSWERS
  };
};

export const deleteQuestionAnswers = id => async dispatch => {
  try {
    const userId = firebase.auth().currentUser.uid;
    await firebase
      .database()
      .ref(`${userId}/qa/${id}`)
      .remove();
  } catch (error) {
    dispatch(apiFailed("delete question failed"));
  }
};

import * as ACTION_TYPES from "./actionTypes";
import axios from "../axios/axios";
import { apiFailed } from "./index";
import { qas } from "../utils/initialQuestions";
import { showMessage } from "./uiState";
import { getUserId } from "../utils/tokenUtils";

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
    const userId = getUserId();
    await axios.patch(`/${userId}/qa.json`, { [id]: qas });
  } catch (error) {
    dispatch(apiFailed("create initial question failed"));
  }
};

export const updateQuestionAnswers = (id, data) => async dispatch => {
  try {
    const userId = getUserId();
    const result = await axios.put(`/${userId}/qa/${id}.json`, data);
    dispatch(updateQuestionAnswersSuccess(result.data));
    dispatch(showMessage("保存に成功しました。", "success"));
  } catch (error) {
    dispatch(apiFailed("update question failed"));
  }
};

const updateQuestionAnswersSuccess = data => {
  return {
    type: ACTION_TYPES.UPDATE_QUESTION_ANSWERS
  };
};

export const deleteQuestionAnswers = id => async dispatch => {
  try {
    const userId = getUserId();
    await axios.delete(`/${userId}/qa/${id}.json`);
  } catch (error) {
    dispatch(apiFailed("delete question failed"));
  }
};

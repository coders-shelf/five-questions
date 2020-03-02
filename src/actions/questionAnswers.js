import * as ACTION_TYPES from "./actionTypes";
import axios from "../axios";
import { apiFailed } from "./index";
import { qas } from "../initialQuestions";

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
    await axios.patch("/qa.json", { [id]: qas });
  } catch (error) {
    dispatch(apiFailed("create initial question failed"));
  }
};

export const updateQuestionAnswers = (id, data) => async dispatch => {
  try {
    const result = await axios.put(`qa/${id}.json`, data);
    dispatch(updateQuestionAnswersSuccess(result.data));
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
    await axios.delete(`qa/${id}.json`);
  } catch (error) {
    dispatch(apiFailed("delete question failed"));
  }
};

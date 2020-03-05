import * as ACTION_TYPES from "../actions/actionTypes";
import { apiFailed } from "./index";
import {
  createInitialQuestion,
  deleteQuestionAnswers
} from "./questionAnswers";
import { showBackdrop, hideBackdrop, showMessage } from "./uiState";
import axios from "../axios/axios";
import { getUserId } from "../utils/tokenUtils";
import firebase, { storage } from "../firebase/firebase";

export const createSubject = data => async dispatch => {
  try {
    const userId = getUserId();
    // アップロード処理
    const imageName = new Date().toISOString() + data.image[0].name;
    const imageUrl = await uploadTaskPromise(data.image[0], imageName, userId);
    const subject = {
      title: data.title,
      image: imageUrl,
      imageName: imageName
    };
    const result = await axios.post(`/${userId}/subject.json`, subject);
    dispatch(createSubjectSuccess(data, result.data.name, imageUrl));
    dispatch(createInitialQuestion(result.data.name));
    dispatch(showMessage("新規作成に成功しました。", "success"));
  } catch (error) {
    dispatch(apiFailed("作成に失敗しました。もう一度試して下さい。"));
  }
};

const createSubjectSuccess = (data, id, imageUrl) => {
  return {
    type: ACTION_TYPES.CREATE_SUBJECT,
    payload: {
      id: id,
      title: data.title,
      image: imageUrl
    }
  };
};

async function uploadTaskPromise(image, imageName, userId) {
  // check => https://stackoverflow.com/questions/53156127/async-await-uploadtask
  return new Promise(function(resolve, reject) {
    const uploadTask = storage.ref(`/images/${userId}/${imageName}`).put(image);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      null,
      err => {
        console.log("error", err);
        reject();
      },
      () => {
        // 完了後の処理
        // 画像表示のため、アップロードした画像のURLを取得
        uploadTask.snapshot.ref.getDownloadURL().then(fireBaseUrl => {
          resolve(fireBaseUrl);
        });
      }
    );
  });
}

export const readSubject = () => async dispatch => {
  dispatch(showBackdrop());
  try {
    const userId = getUserId();
    const result = await axios.get(`/${userId}/subject.json`);
    /* 
      result: {
        data : {
          id: {
            title: "",
            image: ""
          }
        }
      }
      の形を下の形式に変更
      {id: "", title: "", image: ""}
    */
    const subjectList = Object.keys(result.data).map(id => ({
      ...result.data[id],
      id: id
    }));
    dispatch(readSubjectSuccess(subjectList));
    dispatch(hideBackdrop());
  } catch (error) {
    dispatch(readSubjectFail());
    dispatch(hideBackdrop());
  }
};

const readSubjectSuccess = subjectList => {
  return {
    type: ACTION_TYPES.READ_SUBJECT,
    payload: subjectList
  };
};

const readSubjectFail = () => {
  return {
    type: ACTION_TYPES.READ_SUBJECT_FAILED
  };
};

export const updateSubject = (
  data,
  oldImageName,
  oldImageUrl
) => async dispatch => {
  try {
    const userId = getUserId();
    let imageUrl = oldImageUrl; // 画像の更新がなければ元のURLをセットする.
    // data.imageはFileListなので注意
    if (data.image.length !== 0) {
      const imageName = new Date().toISOString() + data.image[0].name;
      imageUrl = await uploadTaskPromise(data.image[0], imageName, userId);
      data.image = imageUrl;
      data.imageName = imageName;
      await axios.put(`/${userId}/subject/${data.id}.json`, data);
      await storage.ref(`/images/${userId}/${oldImageName}`).delete();
    }
    dispatch(updateSubjectSuccess(data, imageUrl));
    dispatch(showMessage("更新に成功しました。", "success"));
  } catch (error) {
    console.log(error);
    dispatch(apiFailed("update subject failed"));
  }
};

const updateSubjectSuccess = (data, imageUrl) => {
  // data.imageはFileListなのでURLをdata.imageにセットする
  data.image = imageUrl;
  return {
    type: ACTION_TYPES.UPDATE_SUBJECT,
    payload: data
  };
};

export const deleteSubject = (id, imageName) => async dispatch => {
  try {
    const userId = getUserId();
    await axios.delete(`/${userId}/subject/${id}.json`);
    dispatch(deleteSubjectSuccess(id));
    dispatch(deleteQuestionAnswers(id));
    // delete image
    await storage.ref(`/images/${userId}/${imageName}`).delete();
    dispatch(showMessage("削除に成功しました。", "success"));
  } catch (error) {
    dispatch(apiFailed("delete subject failed"));
  }
};

const deleteSubjectSuccess = id => {
  return {
    type: ACTION_TYPES.DELETE_SUBJECT,
    payload: id
  };
};

/**
 * Subjectとそれに対応するQuestion, Answerを取得する
 *
 * @param {String} id - SubjectのID
 */
export const getSubject = id => async dispatch => {
  dispatch(showBackdrop());
  try {
    const userId = getUserId();
    const result = await axios.get(`/${userId}/subject/${id}.json`);
    const questionAnswers = await axios.get(`/${userId}/qa/${id}.json`);
    dispatch(getSubjectSuccess(id, result.data, questionAnswers.data));
    dispatch(hideBackdrop());
  } catch (error) {
    dispatch(apiFailed("get subject failed"));
  }
};

const getSubjectSuccess = (id, subjectData, questionAnswers) => {
  let qas = { questions: {}, answers: {} };
  /*
    {
      "q1": "",
      "q2": "",
      ...
      "a1": "",
      "a2": "",
      ...
    }
    の形になっているのでQuestionとAnswerのオブジェクトを分ける
  */
  Object.keys(questionAnswers).forEach(key => {
    key.startsWith("q")
      ? (qas["questions"][key] = questionAnswers[key])
      : (qas["answers"][key] = questionAnswers[key]);
  });
  return {
    type: ACTION_TYPES.GET_SUBJECT,
    payload: { id: id, data: subjectData, questionAnswers: qas }
  };
};

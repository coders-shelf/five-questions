import * as ACTION_TYPES from "../actions/actionTypes";
import { apiFailed } from "./index";
import {
  createInitialQuestion,
  deleteQuestionAnswers
} from "./questionAnswers";
import { showBackdrop, hideBackdrop, showMessage } from "./uiState";
import firebase, { storage } from "../firebase/firebase";

export const createSubject = data => async dispatch => {
  try {
    const userId = firebase.auth().currentUser.uid;
    // アップロード処理
    const imageName = new Date().toISOString() + data.image[0].name;
    const imageUrl = await uploadTaskPromise(data.image[0], imageName, userId);
    const subject = {
      title: data.title,
      image: imageUrl,
      imageName: imageName
    };
    const newSubjectKey = firebase
      .database()
      .ref(`${userId}/subject`)
      .push().key;

    await firebase
      .database()
      .ref(`${userId}/subject/${newSubjectKey}`)
      .update(subject);

    dispatch(createSubjectSuccess(data, newSubjectKey, imageUrl));
    dispatch(createInitialQuestion(newSubjectKey));
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
    const userId = firebase.auth().currentUser.uid;
    const subjectObject = await firebase
      .database()
      .ref(`${userId}/subject`)
      .once("value");
    const subjectList = Object.keys(subjectObject.val()).map(id => ({
      ...subjectObject.val()[id],
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
    const userId = firebase.auth().currentUser.uid;
    let imageUrl = oldImageUrl; // 画像の更新がなければ元のURLをセットする.
    console.log(data);
    // data.imageはFileListなので注意
    if (data.image.length !== 0) {
      // 画像の更新がある場合
      const imageName = new Date().toISOString() + data.image[0].name;
      imageUrl = await uploadTaskPromise(data.image[0], imageName, userId);
      data.image = imageUrl;
      data.imageName = imageName;
      await firebase
        .database()
        .ref(`${userId}/subject/${data.id}`)
        .update(data);
      await storage.ref(`/images/${userId}/${oldImageName}`).delete();
    } else {
      // 画像の更新がない場合
      delete data.image; // imageが空のFileListになっているので削除しておく
      await firebase
        .database()
        .ref(`${userId}/subject/${data.id}`)
        .update(data);
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
    const userId = firebase.auth().currentUser.uid;
    await firebase
      .database()
      .ref(`${userId}/subject/${id}`)
      .remove();

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
    const userId = firebase.auth().currentUser.uid;
    const subject = await firebase
      .database()
      .ref(`${userId}/subject/${id}`)
      .once("value");
    const questionAnswers = await firebase
      .database()
      .ref(`/${userId}/qa/${id}`)
      .once("value");
    dispatch(getSubjectSuccess(id, subject.val(), questionAnswers.val()));
    dispatch(hideBackdrop());
  } catch (error) {
    dispatch(apiFailed("データの取得に失敗しました。"));
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

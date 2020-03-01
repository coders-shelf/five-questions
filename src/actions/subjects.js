import * as ACTION_TYPES from "../actions/actionTypes";
import axios from "../axios";

export const createSubject = data => async dispatch => {
  const subject = { title: data.title, image: "" };
  try {
    const result = await axios.post("/subject.json", subject);
    dispatch(createSubjectSuccess(data, result.data.name));
  } catch (error) {
    dispatch(apiFailed("create subject failed"));
  }
};

const createSubjectSuccess = (data, id) => {
  return {
    type: ACTION_TYPES.CREATE_SUBJECT,
    payload: {
      id: id,
      title: data.title,
      image: "/image"
    }
  };
};

const apiFailed = message => {
  return {
    type: ACTION_TYPES.API_FAILED,
    payload: {
      message: message
    }
  };
};

export const readSubject = () => async dispatch => {
  try {
    const result = await axios.get("/subject.json"); // 認証する場合は変更
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
  } catch (error) {
    dispatch(apiFailed("read subject failed"));
  }
};

const readSubjectSuccess = subjectList => {
  return {
    type: ACTION_TYPES.READ_SUBJECT,
    payload: subjectList
  };
};

export const updateSubject = data => async dispatch => {
  try {
    await axios.put(`/subject/${data.id}.json`, data);
    dispatch(updateSubjectSuccess(data));
  } catch (error) {
    dispatch(apiFailed("update subject failed"));
  }
};

const updateSubjectSuccess = data => {
  return {
    type: ACTION_TYPES.UPDATE_SUBJECT,
    payload: data
  };
};

export const deleteSubject = id => async dispatch => {
  try {
    await axios.delete(`/subject/${id}.json`);
    dispatch(deleteSubjectSuccess(id));
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

export const getSubject = id => async dispatch => {
  try {
    const result = await axios.get(`/subject/${id}.json`);
    dispatch(getSubjectSuccess(id, result.data));
  } catch (error) {
    dispatch(apiFailed("get subject failed"));
  }
};

const getSubjectSuccess = (id, data) => {
  return {
    type: ACTION_TYPES.GET_SUBJECT,
    payload: { id: id, data: data }
  };
};

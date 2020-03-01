import * as ACTION_TYPES from "../actions/actionTypes";
const initialState = {
  subjectList: [],
  subject: {}
};

const subjects = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_SUBJECT:
      return {
        ...state,
        subjectList: state.subjectList.concat(action.payload)
      };
    case ACTION_TYPES.READ_SUBJECT:
      return {
        ...state,
        subjectList: action.payload
      };
    case ACTION_TYPES.UPDATE_SUBJECT:
      return {
        ...state,
        subject: action.payload,
        subjectList: state.subjectList.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case ACTION_TYPES.DELETE_SUBJECT:
      return {
        ...state,
        subjectList: state.subjectList.filter(
          item => item.id !== action.payload
        )
      };
    case ACTION_TYPES.GET_SUBJECT:
      return {
        ...state,
        subject: { ...action.payload.data, id: action.payload.id }
      };
    default:
      return state;
  }
};

export default subjects;

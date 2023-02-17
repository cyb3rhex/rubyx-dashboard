import {
  GET_API_KEY,
  GET_API_KEY_ERROR,
  CREATE_API_KEY,
  CREATE_API_KEY_ERROR,
  DELETE_API_KEY,
  DELETE_API_KEY_ERROR,
} from "../constants/settings";

const initialState = {
  loading: true,
  error: "",
  apikeys: null,
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case CREATE_API_KEY:
      return {
        ...state,
        loading: false,
        apikeys: action.payload,
        error: "",
      };
    case CREATE_API_KEY_ERROR:
      return {
        ...state,
        loading: false,
        apikeys: null,
        error: action.payload,
      };
    case GET_API_KEY:
      return {
        ...state,
        loading: false,
        apikeys: action.payload,
        error: "",
      };
    case GET_API_KEY_ERROR:
      return {
        ...state,
        loading: false,
        apikeys: null,
        error: action.payload,
      };
    case DELETE_API_KEY:
      return {
        ...state,
        loading: false,
        apikeys: action.payload,
        error: "",
      };
    case DELETE_API_KEY_ERROR:
      return {
        ...state,
        loading: false,
        apikeys: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

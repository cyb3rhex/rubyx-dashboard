import {
  GET_URL,
  GET_URL_ERROR,
  CREATE_URL,
  CREATE_URL_ERROR,
  DELETE_URL,
  DELETE_URL_ERROR,
  UPDATE_URL,
  UPDATE_URL_ERROR,
} from "../constants/url";

const initialState = {
  loading: true,
  error: "",
  urls: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_URL:
      return {
        ...state,
        loading: false,
        urls: action.payload,
        error: "",
      };
    case CREATE_URL_ERROR:
      return {
        ...state,
        loading: false,
        urls: null,
        error: action.payload,
      };
    case UPDATE_URL:
      return {
        ...state,
        loading: false,
        urls: action.payload,
        error: "",
      };
    case UPDATE_URL_ERROR:
      return {
        ...state,
        loading: false,
        urls: null,
        error: action.payload,
      };
    case GET_URL:
      return {
        ...state,
        loading: false,
        urls: action.payload,
        error: "",
      };
    case GET_URL_ERROR:
      return {
        ...state,
        loading: false,
        urls: null,
        error: action.payload,
      };
    case DELETE_URL:
      return {
        ...state,
        loading: false,
        urls: action.payload,
        error: "",
      };
    case DELETE_URL_ERROR:
      return {
        ...state,
        loading: false,
        urls: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

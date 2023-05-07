import {
  GET_API_KEY,
  GET_API_KEY_ERROR,
  CREATE_API_KEY,
  CREATE_API_KEY_ERROR,
  DELETE_API_KEY,
  DELETE_API_KEY_ERROR,
  PULL_RUBYX_DATA,
  PULL_RUBYX_DATA_ERROR,
  PULL_RUBYX_DATA_SUCCESS,
  GET_DATA_REPO_URL,
  GET_DATA_REPO_URL_ERROR,
  GET_DATA_REPO_URL_SUCCESS,
  SET_DATA_REPO_URL,
  SET_DATA_REPO_URL_ERROR,
  SET_DATA_REPO_URL_SUCCESS,
} from "../constants/settings";

const initialState = {
  loading: true,
  error: "",
  apikeys: null,
  dataRepoUrl: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_REPO_URL:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_DATA_REPO_URL_SUCCESS:
      return {
        ...state,
        loading: false,
        dataRepoUrl: action.payload.value,
        error: "",
      };
    case GET_DATA_REPO_URL_ERROR:
      return {
        ...state,
        loading: false,
        dataRepoUrl: null,
        error: action.payload,
      };
    case SET_DATA_REPO_URL:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case SET_DATA_REPO_URL_SUCCESS:
      return {
        ...state,
        loading: false,
        dataRepoUrl: action.payload.value,
        error: "",
      };
    case SET_DATA_REPO_URL_ERROR:
      return {
        ...state,
        loading: false,
        dataRepoUrl: null,
        error: action.payload,
      };
    case PULL_RUBYX_DATA:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case PULL_RUBYX_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case PULL_RUBYX_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
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

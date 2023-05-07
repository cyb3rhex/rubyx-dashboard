import {
  GET_PLATFORM,
  GET_PLATFORM_SUCCESS,
  GET_PLATFORM_ERROR,
  CREATE_PLATFORM,
  CREATE_PLATFORM_SUCCESS,
  CREATE_PLATFORM_ERROR,
  DELETE_PLATFORM,
  DELETE_PLATFORM_SUCCESS,
  DELETE_PLATFORM_ERROR,
  UPDATE_PLATFORM,
  UPDATE_PLATFORM_SUCCESS,
  UPDATE_PLATFORM_ERROR,
} from "../constants/platform";

const initialState = {
  loading: true,
  error: "",
  platforms: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PLATFORM:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case CREATE_PLATFORM_SUCCESS:
      return {
        ...state,
        loading: false,
        platforms: action.payload,
        error: "",
      };
    case CREATE_PLATFORM_ERROR:
      return {
        ...state,
        loading: false,
        platforms: null,
        error: action.payload,
      };
    case UPDATE_PLATFORM:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case UPDATE_PLATFORM_SUCCESS:
      return {
        ...state,
        loading: false,
        platforms: action.payload,
        error: "",
      };
    case UPDATE_PLATFORM_ERROR:
      return {
        ...state,
        loading: false,
        platforms: null,
        error: action.payload,
      };
    case GET_PLATFORM:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_PLATFORM_SUCCESS:
      return {
        ...state,
        loading: false,
        platforms: action.payload,
        error: "",
      };
    case GET_PLATFORM_ERROR:
      return {
        ...state,
        loading: false,
        platforms: null,
        error: action.payload,
      };
    case DELETE_PLATFORM:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DELETE_PLATFORM_SUCCESS:
      return {
        ...state,
        loading: false,
        platforms: action.payload,
        error: "",
      };
    case DELETE_PLATFORM_ERROR:
      return {
        ...state,
        loading: false,
        platforms: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

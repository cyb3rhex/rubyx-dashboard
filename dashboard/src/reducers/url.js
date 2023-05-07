import {
  GET_URL,
  GET_URL_SUCCESS,
  GET_URL_ERROR,
} from "../constants/url";

const initialState = {
  loading: true,
  error: "",
  urls: null,
  total: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_URL:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_URL_SUCCESS:
      return {
        ...state,
        loading: false,
        urls: action.payload.urls,
        total: action.payload.total,
        error: "",
      };
    case GET_URL_ERROR:
      return {
        ...state,
        loading: false,
        urls: null,
        total: 0,
        error: action.payload,
      };
    default:
      return state;
  }
}

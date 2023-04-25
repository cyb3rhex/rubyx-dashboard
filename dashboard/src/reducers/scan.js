import {
  GET_SCANS,
  GET_SCANS_SUCCESS,
  GET_SCANS_ERROR,
  CREATE_SCAN,
  CREATE_SCAN_SUCCESS,
  CREATE_SCAN_ERROR,
  DELETE_SCAN,
  DELETE_SCAN_SUCCESS,
  DELETE_SCAN_ERROR,
} from "../constants/scan";

const initialState = {
  loading: true,
  error: "",
  scans: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SCANS:
      return {
        ...state,
        loading: true,
      };
    case GET_SCANS_SUCCESS:
      return {
        ...state,
        loading: false,
        scans: action.payload,
        error: "",
      };
    case GET_SCANS_ERROR:
      return {
        ...state,
        loading: false,
        scans: null,
        error: action.payload,
      };
    case CREATE_SCAN:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SCAN_SUCCESS:
      return {
        ...state,
        loading: false,
        scans: action.payload,
        error: "",
      };
    case CREATE_SCAN_ERROR:
      return {
        ...state,
        loading: false,
        scans: null,
        error: action.payload,
      };
    case DELETE_SCAN:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SCAN_SUCCESS:
      return {
        ...state,
        loading: false,
        scans: action.payload,
        error: "",
      };
    case DELETE_SCAN_ERROR:
      return {
        ...state,
        loading: false,
        scans: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

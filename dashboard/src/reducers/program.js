import {
  GET_PROGRAM,
  GET_PROGRAM_SUCCESS,
  GET_PROGRAM_ERROR,
  CREATE_PROGRAM,
  CREATE_PROGRAM_SUCCESS,
  CREATE_PROGRAM_ERROR,
  DELETE_PROGRAM,
  DELETE_PROGRAM_SUCCESS,
  DELETE_PROGRAM_ERROR,
  UPDATE_PROGRAM,
  UPDATE_PROGRAM_SUCCESS,
  UPDATE_PROGRAM_ERROR,
  RELOAD_PROGRAM,
  RELOAD_PROGRAM_SUCCESS,
  RELOAD_PROGRAM_ERROR,
  GET_SCOPE,
  GET_SCOPE_ERROR,
  GET_SCOPE_SUCCESS
} from "../constants/program";

const initialState = {
  loadingScope: true,
  loading: true,
  error: "",
  programs: null,
  scope: null
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_SCOPE:
      return {
        ...state,
        loadingScope: true,
        error: "",
      };
    case GET_SCOPE_SUCCESS:
      return {
        ...state,
        loadingScope: false,
        scope: action.payload,
        error: "",
      };
    case GET_SCOPE_ERROR:
      return {
        ...state,
        loadingScope: false,
        scope: null,
        error: action.payload,
      };
    case RELOAD_PROGRAM:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case RELOAD_PROGRAM_SUCCESS:
      return {
        ...state,
        loading: false,
        programs: action.payload,
        error: "",
      };
    case RELOAD_PROGRAM_ERROR:
      return {
        ...state,
        loading: false,
        programs: null,
        error: action.payload,
      };
    case CREATE_PROGRAM:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case CREATE_PROGRAM_SUCCESS:
      return {
        ...state,
        loading: false,
        programs: action.payload,
        error: "",
      };
    case CREATE_PROGRAM_ERROR:
      return {
        ...state,
        loading: false,
        programs: null,
        error: action.payload,
      };
    case UPDATE_PROGRAM:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case UPDATE_PROGRAM_SUCCESS:
      return {
        ...state,
        loading: false,
        programs: action.payload,
        error: "",
      };
    case UPDATE_PROGRAM_ERROR:
      return {
        ...state,
        loading: false,
        programs: null,
        error: action.payload,
      };
    case GET_PROGRAM:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_PROGRAM_SUCCESS:
      return {
        ...state,
        loading: false,
        programs: action.payload,
        error: "",
      };
    case GET_PROGRAM_ERROR:
      return {
        ...state,
        loading: false,
        programs: null,
        error: action.payload,
      };
    case DELETE_PROGRAM:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case DELETE_PROGRAM_SUCCESS:
      return {
        ...state,
        loading: false,
        programs: action.payload,
        error: "",
      };
    case DELETE_PROGRAM_ERROR:
      return {
        ...state,
        loading: false,
        programs: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

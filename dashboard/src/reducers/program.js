import {
  GET_PROGRAM,
  GET_PROGRAM_ERROR,
  CREATE_PROGRAM,
  CREATE_PROGRAM_ERROR,
  DELETE_PROGRAM,
  DELETE_PROGRAM_ERROR,
  UPDATE_PROGRAM,
  UPDATE_PROGRAM_ERROR,
  RELOAD_PROGRAM,
  RELOAD_PROGRAM_ERROR,
  GET_SCOPE,
  GET_SCOPE_ERROR,
  GET_SCOPE_SUCCESS
} from "../constants/program";

const initialState = {
  loading: true,
  error: "",
  programs: null,
  scope: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SCOPE:
      return {
        ...state,
        loading: true,
        scope: null,
        error: "",
      };
    case GET_SCOPE_SUCCESS:
      return {
        ...state,
        loading: false,
        scope: action.payload,
        error: "",
      };
    case GET_SCOPE_ERROR:
      return {
        ...state,
        loading: false,
        scope: null,
        error: action.payload,
      };
    case RELOAD_PROGRAM:
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

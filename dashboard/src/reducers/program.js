import {
  GET_PROGRAM,
  GET_PROGRAM_ERROR,
  CREATE_PROGRAM,
  CREATE_PROGRAM_ERROR,
  DELETE_PROGRAM,
  DELETE_PROGRAM_ERROR,
  UPDATE_PROGRAM,
  UPDATE_PROGRAM_ERROR,
} from "../constants/program";

const initialState = {
  loading: true,
  error: "",
  programs: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
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

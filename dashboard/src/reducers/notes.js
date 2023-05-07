import {
  GET_NOTES,
  GET_NOTES_ERROR,
  GET_NOTES_SUCCESS,
  GET_NOTE,
  GET_NOTE_SUCCESS,
  GET_NOTE_ERROR,
  CREATE_NOTE,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_ERROR,
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
  UPDATE_NOTE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_ERROR,
} from "../constants/notes";

const initialState = {
  loading: true,
  error: "",
  notes: null,
  total: 0
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        loading: true,
      };
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: action.payload.notes,
        total: action.payload.total,
        error: "",
      };
    case GET_NOTES_ERROR:
      return {
        ...state,
        loading: false,
        notes: null,
        total: 0,
        error: action.payload,
      };
    case CREATE_NOTE:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case CREATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: action.payload.notes,
        total: action.payload.total,
        error: "",
      };
    case CREATE_NOTE_ERROR:
      return {
        ...state,
        loading: false,
        notes: null,
        error: action.payload,
      };
    case UPDATE_NOTE:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: action.payload.notes,
        total: action.payload.total,
        error: "",
      };
    case UPDATE_NOTE_ERROR:
      return {
        ...state,
        loading: false,
        notes: null,
        error: action.payload,
      };
    case GET_NOTE:
      return {
        ...state,
        loading: true,
        notes: null,
        error: "",
      };
    case GET_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: action.payload,
        error: "",
      };
    case GET_NOTE_ERROR:
      return {
        ...state,
        loading: false,
        notes: null,
        error: action.payload,
      };
    case DELETE_NOTE:
      return {
        ...state,
        loading: true,
        notes: null,
        error: "",
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: action.payload.notes,
        total: action.payload.total,
        error: "",
      };
    case DELETE_NOTE_ERROR:
      return {
        ...state,
        loading: false,
        notes: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

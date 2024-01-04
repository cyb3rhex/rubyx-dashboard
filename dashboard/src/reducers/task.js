import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
} from "../constants/task";

const initialState = {
  loading: true,
  error: "",
  tasks: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        loading: true,
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        error: "",
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        loading: false,
        tasks: null,
        error: action.payload,
      };
    case CREATE_TASK:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        error: "",
      };
    case CREATE_TASK_ERROR:
      return {
        ...state,
        loading: false,
        tasks: null,
        error: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        error: "",
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        loading: false,
        tasks: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
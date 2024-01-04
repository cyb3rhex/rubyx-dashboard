import API from "./api";
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
import {toast} from "react-toastify";

export const getTasks = () => async (dispatch) => {
  dispatch({
    type: GET_TASKS,
  });
  try {
    const data = await API.getTasks();
    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_TASKS_ERROR,
      payload: err,
    });
  }
};

export const createTask = (task) => async (dispatch) => {
  dispatch({
    type: CREATE_TASK,
  });
  try {
    await API.createTask(task);
    const data = await API.getTasks();
    dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: data,
    });
    toast.success("Task Launched !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
    });
  } catch (err) {
    dispatch({
      type: CREATE_TASK_ERROR,
      payload: err,
    });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_TASK
  });
  try {
    API.deleteTask(id)
      .then((res) => {
        API.getTasks().then((data) => {
          dispatch({
            type: DELETE_TASK_SUCCESS,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_TASK_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: DELETE_TASK_ERROR,
      payload: err,
    });
  }
};
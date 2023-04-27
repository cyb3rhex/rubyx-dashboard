import API from "./api";
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
import {toast} from "react-toastify";

export const getDataRepoUrl = () => async (dispatch) => {
  dispatch({
    type: GET_DATA_REPO_URL,
  });
  try {
    API.getDataRepoUrl()
      .then((data) => {
        dispatch({
          type: GET_DATA_REPO_URL_SUCCESS,  
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_DATA_REPO_URL_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_DATA_REPO_URL_ERROR,
      payload: err,
    });
  }
};

export const setDataRepoUrl = (url) => async (dispatch) => {
  dispatch({
    type: SET_DATA_REPO_URL,
  });
  try {
    API.setDataRepoUrl(url)
      .then((data) => {
        dispatch({
          type: SET_DATA_REPO_URL_SUCCESS,
          payload: data,
        });
        toast.success("Data Repo URL Set !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_DATA_REPO_URL_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: SET_DATA_REPO_URL_ERROR,
      payload: err,
    });
  }
};

export const pullRubyxData = () => async (dispatch) => {
  dispatch({
    type: PULL_RUBYX_DATA,
  });
  try {
    API.pullRubyxData()
      .then((res) => {
        dispatch({
          type: PULL_RUBYX_DATA_SUCCESS,
        });
        toast.success("Rubyx Data Pulled !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: PULL_RUBYX_DATA_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: PULL_RUBYX_DATA_ERROR,
      payload: err,
    });
  }
};

export const getApiKeys = () => async (dispatch) => {
    try {
  
      API.getApiKeys()
        .then((data) => {
          dispatch({
            type: GET_API_KEY,
            payload: data,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_API_KEY_ERROR,
            payload: err,
          });
        });
    } catch (err) {
      dispatch({
        type: GET_API_KEY_ERROR,
        payload: err,
      });
    }
  };

export const createApiKey = () => async (dispatch) => {
  try {
    API.createApiKey()
      .then((res) => {
        API.getApiKeys().then((data) => {
            dispatch({
                type: CREATE_API_KEY,
                payload: data,
              });
        })
        
      })
      .catch((err) => {
        dispatch({
          type: CREATE_API_KEY_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: CREATE_API_KEY_ERROR,
      payload: err,
    });
  }
};

export const deleteApiKey = (id) => async (dispatch) => {
    try {
      API.deleteApiKey(id)
        .then((res) => {
          API.getApiKeys().then((data) => {
              dispatch({
                  type: DELETE_API_KEY,
                  payload: data,
                });
          })
          
        })
        .catch((err) => {
          dispatch({
            type: DELETE_API_KEY_ERROR,
            payload: err,
          });
        });
    } catch (err) {
      dispatch({
        type: DELETE_API_KEY_ERROR,
        payload: err,
      });
    }
  };
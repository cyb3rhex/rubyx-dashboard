import API from "./api";
import {
  GET_API_KEY,
  GET_API_KEY_ERROR,
  CREATE_API_KEY,
  CREATE_API_KEY_ERROR,
  DELETE_API_KEY,
  DELETE_API_KEY_ERROR,
} from "../constants/settings";

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
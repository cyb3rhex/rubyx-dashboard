import API from "./api";
import {
  GET_URL,
  GET_URL_ERROR,
  CREATE_URL,
  CREATE_URL_ERROR,
  DELETE_URL,
  DELETE_URL_ERROR,
  UPDATE_URL,
  UPDATE_URL_ERROR
} from "../constants/url";

export const getUrls = () => async (dispatch) => {
  try {
    API.getUrls()
      .then((data) => {
        dispatch({
          type: GET_URL,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_URL_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_URL_ERROR,
      payload: err,
    });
  }
};

export const createUrl = (subdomain_id, url) => async (dispatch) => {
  try {
    var tosend = {
      subdomain_id: subdomain_id,
      url: url
    };

    API.createUrl(tosend)
      .then((res) => {
        API.getUrls().then((data) => {
          dispatch({
            type: CREATE_URL,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_URL_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: CREATE_URL_ERROR,
      payload: err,
    });
  }
};

export const updateUrl = (id, subdomain_id, url) => async (dispatch) => {
  try {
    var tosend = {
      id: id,
      subdomain_id: subdomain_id,
      url: url
    };

    API.updateUrl(tosend)
      .then((res) => {
        API.getUrls().then((data) => {
          dispatch({
            type: UPDATE_URL,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_URL_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: UPDATE_URL_ERROR,
      payload: err,
    });
  }
};

export const deleteUrl = (id) => async (dispatch) => {
  try {
    API.deleteUrl(id)
      .then((res) => {
        API.getUrls().then((data) => {
          dispatch({
            type: DELETE_URL,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_URL_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: DELETE_URL_ERROR,
      payload: err,
    });
  }
};

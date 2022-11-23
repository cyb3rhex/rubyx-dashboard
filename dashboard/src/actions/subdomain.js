import API from "./api";
import {
  GET_SUBDOMAIN,
  GET_SUBDOMAIN_ERROR,
  CREATE_SUBDOMAIN,
  CREATE_SUBDOMAIN_ERROR,
  DELETE_SUBDOMAIN,
  DELETE_SUBDOMAIN_ERROR,
  UPDATE_SUBDOMAIN,
  UPDATE_SUBDOMAIN_ERROR
} from "../constants/subdomain";

export const getSubdomains = () => async (dispatch) => {
  try {
    API.getSubdomains()
      .then((data) => {
        dispatch({
          type: GET_SUBDOMAIN,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_SUBDOMAIN_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_SUBDOMAIN_ERROR,
      payload: err,
    });
  }
};

export const createSubdomain = (program_id, url) => async (dispatch) => {
  try {
    var subdomain = {
      program_id: program_id,
      url: url
    };

    API.createSubdomain(subdomain)
      .then((res) => {
        API.getSubdomains().then((data) => {
          dispatch({
            type: CREATE_SUBDOMAIN,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_SUBDOMAIN_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: CREATE_SUBDOMAIN_ERROR,
      payload: err,
    });
  }
};

export const updateSubdomain = (id, program_id, url) => async (dispatch) => {
  try {
    var subdomain = {
      id: id,
      program_id: program_id,
      url: url
    };

    console.log(subdomain)

    API.updateSubdomain(subdomain)
      .then((res) => {
        API.getSubdomains().then((data) => {
          dispatch({
            type: UPDATE_SUBDOMAIN,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_SUBDOMAIN_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: UPDATE_SUBDOMAIN_ERROR,
      payload: err,
    });
  }
};

export const deleteSubdomain = (id) => async (dispatch) => {
  try {
    API.deleteSubdomain(id)
      .then((res) => {
        API.getSubdomains().then((data) => {
          dispatch({
            type: DELETE_SUBDOMAIN,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_SUBDOMAIN_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: DELETE_SUBDOMAIN_ERROR,
      payload: err,
    });
  }
};

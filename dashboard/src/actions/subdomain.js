import API from "./api";
import {
  GET_SUBDOMAIN,
  GET_SUBDOMAIN_SUCCESS,
  GET_SUBDOMAIN_ERROR,
  CREATE_SUBDOMAIN,
  CREATE_SUBDOMAIN_ERROR,
  DELETE_SUBDOMAIN,
  DELETE_SUBDOMAIN_ERROR,
  UPDATE_SUBDOMAIN,
  UPDATE_SUBDOMAIN_ERROR,
  GET_UNIQUE_TECHNOLOGIES,
  GET_UNIQUE_TECHNOLOGIES_SUCCESS,
  GET_UNIQUE_TECHNOLOGIES_ERROR
} from "../constants/subdomain";

export const getUniqueTechnologies = () => async (dispatch) => {
  dispatch({
    type: GET_UNIQUE_TECHNOLOGIES,
  });
  try {
    API.getUniqueTechnologies()
      .then((data) => {
        dispatch({
          type: GET_UNIQUE_TECHNOLOGIES_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_UNIQUE_TECHNOLOGIES_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_UNIQUE_TECHNOLOGIES_ERROR,
      payload: err,
    });
  }
};

export const getSubdomains = (page, resultsPerPage, search, program_id, technologies) => async (dispatch) => {
  dispatch({
    type: GET_SUBDOMAIN,
  });
  try {
    API.getSubdomains(page, resultsPerPage, search, program_id, technologies)
      .then((data) => {
        dispatch({
          type: GET_SUBDOMAIN_SUCCESS,
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

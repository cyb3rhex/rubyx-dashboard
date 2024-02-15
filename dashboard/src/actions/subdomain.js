import API from "./api";
import {
  GET_SUBDOMAIN,
  GET_SUBDOMAIN_SUCCESS,
  GET_SUBDOMAIN_ERROR
} from "../constants/subdomain";

export const getAllSubdomains = (page, resultsPerPage) => async (dispatch) => {
  dispatch({
    type: GET_SUBDOMAIN,
  });
  try {
    API.getAllSubdomains(page, resultsPerPage)
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


export const getSubdomains = (page, resultsPerPage, search, program_id) => async (dispatch) => {
  dispatch({
    type: GET_SUBDOMAIN,
  });
  try {
    API.getSubdomains(page, resultsPerPage, search, program_id)
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

import API from "./api";
import {
  GET_SUBDOMAIN,
  GET_SUBDOMAIN_SUCCESS,
  GET_SUBDOMAIN_ERROR,
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

import API from "./api";
import {
  GET_URL,
  GET_URL_SUCCESS,
  GET_URL_ERROR,
} from "../constants/url";

export const getUrls = (subdomain, page, resultsPerPage) => async (dispatch) => {
  dispatch({
    type: GET_URL,
  });
  try {
    API.getUrls(subdomain, page, resultsPerPage)
      .then((data) => {
        dispatch({
          type: GET_URL_SUCCESS,
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

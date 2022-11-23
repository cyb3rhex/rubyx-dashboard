import API from "./api";
import {
  GET_REVENUE,
  GET_REVENUE_ERROR,
  CREATE_REVENUE,
  CREATE_REVENUE_ERROR,
  DELETE_REVENUE,
  DELETE_REVENUE_ERROR,
  UPDATE_REVENUE,
  UPDATE_REVENUE_ERROR
} from "../constants/revenue";

export const getRevenues = () => async (dispatch) => {
  try {
    API.getRevenues()
      .then((data) => {
        dispatch({
          type: GET_REVENUE,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_REVENUE_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_REVENUE_ERROR,
      payload: err,
    });
  }
};

export const createRevenue = (program_id, vulnerability_id, money) => async (dispatch) => {
  try {
    var revenue = {
      program_id: program_id,
      vulnerability_id: vulnerability_id,
      money: money
    };

    API.createRevenue(revenue)
      .then((res) => {
        API.getRevenues().then((data) => {
          dispatch({
            type: CREATE_REVENUE,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_REVENUE_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: CREATE_REVENUE_ERROR,
      payload: err,
    });
  }
};

export const updateRevenue = (id, program_id, vulnerability_id, money) => async (dispatch) => {
  try {
    var revenue = {
      id: id,
      program_id: program_id,
      vulnerability_id: vulnerability_id,
      money: money
    };

    console.log(revenue)

    API.updateRevenue(revenue)
      .then((res) => {
        API.getRevenues().then((data) => {
          dispatch({
            type: UPDATE_REVENUE,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_REVENUE_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: UPDATE_REVENUE_ERROR,
      payload: err,
    });
  }
};

export const deleteRevenue = (id) => async (dispatch) => {
  try {
    API.deleteRevenue(id)
      .then((res) => {
        API.getRevenues().then((data) => {
          dispatch({
            type: DELETE_REVENUE,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_REVENUE_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: DELETE_REVENUE_ERROR,
      payload: err,
    });
  }
};

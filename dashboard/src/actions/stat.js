import API from "./api";
import {
  GET_STATS,
  GET_STATS_ERROR,
  RELOAD_STAT,
  RELOAD_STAT_ERROR,
} from "../constants/stat";

export const getStats = () => async (dispatch) => {
  try {
    API.getStats()
      .then((data) => {
        dispatch({
          type: GET_STATS,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_STATS_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_STATS_ERROR,
      payload: err,
    });
  }
};

export const reloadStats = () => async (dispatch) => {
  try {
    API.reloadStats()
      .then((res) => {
        API.getStats().then((data) => {
          dispatch({
            type: RELOAD_STAT,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: RELOAD_STAT_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: RELOAD_STAT_ERROR,
      payload: err,
    });
  }
};

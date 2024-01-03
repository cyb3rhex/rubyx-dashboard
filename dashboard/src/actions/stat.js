import API from "./api";
import {
  GET_STATS,
  GET_STATS_SUCCESS,
  GET_STATS_ERROR,
  RELOAD_STAT,
  RELOAD_STAT_SUCCESS,
  RELOAD_STAT_ERROR,
} from "../constants/stat";
import { toast } from "react-toastify";

export const getStats = (platform_id) => async (dispatch) => {
  dispatch({
    type: GET_STATS,
  });
  try {
    platform_id = platform_id ? platform_id : "";
    API.getStats(platform_id)
      .then((data) => {
        dispatch({
          type: GET_STATS_SUCCESS,
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

export const reloadStats = (platform_id) => async (dispatch) => {
  dispatch({
    type: RELOAD_STAT,
  });
  try {
    platform_id = platform_id ? platform_id : "";
    API.reloadStats(platform_id)
      .then((res) => {
        API.getStats().then((data) => {
          dispatch({
            type: RELOAD_STAT_SUCCESS,
            payload: data,
          });

          toast.success("Stats reloaded !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
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

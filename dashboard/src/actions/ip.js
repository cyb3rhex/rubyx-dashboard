import API from "./api";
import {
  GET_IP,
  GET_IP_ERROR,
  CREATE_IP,
  CREATE_IP_ERROR,
  DELETE_IP,
  DELETE_IP_ERROR,
  UPDATE_IP,
  UPDATE_IP_ERROR
} from "../constants/ip";

export const getIps = () => async (dispatch) => {
  try {
    API.getIps()
      .then((data) => {
        dispatch({
          type: GET_IP,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_IP_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_IP_ERROR,
      payload: err,
    });
  }
};

export const createIp = (program_id, ip) => async (dispatch) => {
  try {
    var tosend = {
      program_id: program_id,
      ip: ip
    };

    API.createIp(tosend)
      .then((res) => {
        API.getIps().then((data) => {
          dispatch({
            type: CREATE_IP,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_IP_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: CREATE_IP_ERROR,
      payload: err,
    });
  }
};

export const updateIp = (id, program_id, ip) => async (dispatch) => {
  try {
    var tosend = {
      id: id,
      program_id: program_id,
      ip: ip
    };

    API.updateIp(tosend)
      .then((res) => {
        API.getIps().then((data) => {
          dispatch({
            type: UPDATE_IP,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_IP_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: UPDATE_IP_ERROR,
      payload: err,
    });
  }
};

export const deleteIp = (id) => async (dispatch) => {
  try {
    API.deleteIp(id)
      .then((res) => {
        API.getIps().then((data) => {
          dispatch({
            type: DELETE_IP,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_IP_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: DELETE_IP_ERROR,
      payload: err,
    });
  }
};

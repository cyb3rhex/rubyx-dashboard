import API from "./api";
import { slugify } from "../utils/misc";
import {
  GET_PROGRAM,
  GET_PROGRAM_SUCCESS,
  GET_PROGRAM_ERROR,
  CREATE_PROGRAM,
  CREATE_PROGRAM_SUCCESS,
  CREATE_PROGRAM_ERROR,
  DELETE_PROGRAM,
  DELETE_PROGRAM_SUCCESS,
  DELETE_PROGRAM_ERROR,
  UPDATE_PROGRAM,
  UPDATE_PROGRAM_SUCCESS,
  UPDATE_PROGRAM_ERROR,
  RELOAD_PROGRAM,
  RELOAD_PROGRAM_SUCCESS,
  RELOAD_PROGRAM_ERROR,
  GET_SCOPE,
  GET_SCOPE_ERROR,
  GET_SCOPE_SUCCESS,
} from "../constants/program";
import {toast} from "react-toastify";

export const getScope = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SCOPE,
    });

    API.getScope(id)
      .then((data) => {
        dispatch({
          type: GET_SCOPE_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_SCOPE_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_SCOPE_ERROR,
      payload: err,
    });
  }
};


export const reloadPrograms = (page, resultsPerPage, search, type, platform_id) => async (dispatch) => {
  dispatch({
    type: RELOAD_PROGRAM,
  });
  try {
    API.reloadPrograms(page, resultsPerPage, search, type, platform_id)
      .then((res) => {
        API.getPrograms().then((data) => {
          dispatch({
            type: RELOAD_PROGRAM_SUCCESS,
            payload: data,
          });
          toast.success("Programs reloaded !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: RELOAD_PROGRAM_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: RELOAD_PROGRAM_ERROR,
      payload: err,
    });
  }
};


export const getPrograms = (page, resultsPerPage, search, type, platform_id) => async (dispatch) => {
  dispatch({
    type: GET_PROGRAM,
  });
  try {
    API.getPrograms(page, resultsPerPage, search, type, platform_id)
      .then((data) => {
        dispatch({
          type: GET_PROGRAM_SUCCESS,
          payload: data,
        });
        
      })
      .catch((err) => {
        dispatch({
          type: GET_PROGRAM_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_PROGRAM_ERROR,
      payload: err,
    });
  }
};

export const createProgram = (platform_id, name, url, type, vdp, resultsPerPage) => async (dispatch) => {
  dispatch({
    type: CREATE_PROGRAM,
  });
  try {
    var program = {
      platform_id: platform_id,
      name: name,
      slug: slugify(name),
      url: url,
      type: type,
      vdp: vdp
    };

    API.createProgram(program)
      .then((res) => {
        API.getPrograms(1, resultsPerPage, "", "", 0).then((data) => {
          dispatch({
            type: CREATE_PROGRAM_SUCCESS,
            payload: data,
          });
          toast.success("Program added !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_PROGRAM_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: CREATE_PROGRAM_ERROR,
      payload: err,
    });
  }
};

export const updateProgram = (id, platform_id, name, url, type, vdp, resultsPerPage) => async (dispatch) => {
  dispatch({
    type: UPDATE_PROGRAM,
  });
  try {
    var program = {
      id: id,
      platform_id: platform_id,
      name: name,
      slug: slugify(name),
      url: url,
      type: type,
      vdp: vdp
    };

    API.updateProgram(program)
      .then((res) => {
        API.getPrograms(1, resultsPerPage, "", "", 0).then((data) => {
          dispatch({
            type: UPDATE_PROGRAM_SUCCESS,
            payload: data,
          });
          toast.success("Program updated !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_PROGRAM_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: UPDATE_PROGRAM_ERROR,
      payload: err,
    });
  }
};

export const deleteProgram = (id, resultsPerPage) => async (dispatch) => {
  dispatch({
    type: DELETE_PROGRAM,
  });
  try {
    API.deleteProgram(id)
      .then((res) => {
        API.getPrograms(1, resultsPerPage, "", "", 0).then((data) => {
          dispatch({
            type: DELETE_PROGRAM_SUCCESS,
            payload: data,
          });
          toast.success("Program deleted !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_PROGRAM_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: DELETE_PROGRAM_ERROR,
      payload: err,
    });
  }
};

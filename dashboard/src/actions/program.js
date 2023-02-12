import API from "./api";
import { slugify } from "../utils/misc";
import {
  GET_PROGRAM,
  GET_PROGRAM_ERROR,
  CREATE_PROGRAM,
  CREATE_PROGRAM_ERROR,
  DELETE_PROGRAM,
  DELETE_PROGRAM_ERROR,
  UPDATE_PROGRAM,
  UPDATE_PROGRAM_ERROR,
  RELOAD_PROGRAM,
  RELOAD_PROGRAM_ERROR,
  GET_SCOPE,
  GET_SCOPE_ERROR,
  GET_SCOPE_SUCCESS,
} from "../constants/program";

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


export const reloadPrograms = () => async (dispatch) => {
  try {
    API.reloadPrograms()
      .then((res) => {
        API.getPrograms().then((data) => {
          dispatch({
            type: RELOAD_PROGRAM,
            payload: data,
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


export const getPrograms = () => async (dispatch) => {
  try {
    API.getPrograms()
      .then((data) => {
        dispatch({
          type: GET_PROGRAM,
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

export const createProgram = (platform_id, name, url, type, vdp) => async (dispatch) => {
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
        API.getPrograms().then((data) => {
          dispatch({
            type: CREATE_PROGRAM,
            payload: data,
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

export const updateProgram = (id, platform_id, name, url, type, vdp) => async (dispatch) => {
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
        API.getPrograms().then((data) => {
          dispatch({
            type: UPDATE_PROGRAM,
            payload: data,
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

export const deleteProgram = (id) => async (dispatch) => {
  try {
    API.deleteProgram(id)
      .then((res) => {
        API.getPrograms().then((data) => {
          dispatch({
            type: DELETE_PROGRAM,
            payload: data,
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

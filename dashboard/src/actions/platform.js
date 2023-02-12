import API from "./api";
import { slugify } from "../utils/misc";
import {
  GET_PLATFORM,
  GET_PLATFORM_ERROR,
  CREATE_PLATFORM,
  CREATE_PLATFORM_ERROR,
  DELETE_PLATFORM,
  DELETE_PLATFORM_ERROR,
  UPDATE_PLATFORM,
  UPDATE_PLATFORM_ERROR
} from "../constants/platform";

export const getPlatforms = () => async (dispatch) => {
  try {
    API.getPlatforms()
      .then((data) => {
        console.log(data)
        dispatch({
          type: GET_PLATFORM,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_PLATFORM_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_PLATFORM_ERROR,
      payload: err,
    });
  }
};

export const createPlatform = (name, email, password, otp, type) => async (dispatch) => {
  try {
    var platform = {
      name: name,
      slug: slugify(name),
      email: email,
      password: password,
      otp: otp,
      hunter_username: "",
      type: type,
    };

    API.createPlatform(platform)
      .then((res) => {
        API.getPlatforms().then((data) => {
          dispatch({
            type: CREATE_PLATFORM,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_PLATFORM_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: CREATE_PLATFORM_ERROR,
      payload: err,
    });
  }
};

export const updatePlatform = (id, name, email, password, otp, type) => async (dispatch) => {
  try {
    var platform = {
      id: id,
      name: name,
      slug: slugify(name),
      email: email,
      password: password,
      otp: otp,
      type: type,
    };

    API.updatePlatform(platform)
      .then((res) => {
        API.getPlatforms().then((data) => {
          dispatch({
            type: UPDATE_PLATFORM,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_PLATFORM_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: UPDATE_PLATFORM_ERROR,
      payload: err,
    });
  }
};

export const deletePlatform = (id) => async (dispatch) => {
  try {
    API.deletePlatform(id)
      .then((res) => {
        API.getPlatforms().then((data) => {
          dispatch({
            type: DELETE_PLATFORM,
            payload: data,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_PLATFORM_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: DELETE_PLATFORM_ERROR,
      payload: err,
    });
  }
};

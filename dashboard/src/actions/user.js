import API from "./api";
import {
  LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  CHANGE_EMAIL,
  CHANGE_EMAIL_ERROR,
} from "../constants/user";
import { toast } from "react-toastify";

export const login = (email, pass) => async (dispatch) => {
  try {
    var data = {
      email: email,
      pass: pass,
    };

    API.login(data)
      .then((user) => {
        dispatch({
          type: LOGIN,
          payload: user,
        });
        toast.success("You are now logged in !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
        dispatch({
          type: LOGIN_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
    });
    dispatch({
      type: LOGIN_ERROR,
      payload: err,
    });
  }
};

export const changePassword = (previousPass, newPass) => async (dispatch) => {
  try {
    var data = {
      previousPass: previousPass,
      newPass: newPass
    };

    API.updatePassword(data)
      .then((res) => {
        dispatch({
          type: CHANGE_PASSWORD,
        });
        toast.success("Password changed !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: CHANGE_PASSWORD_ERROR,
          payload: err,
        });
        toast.error("An error has occured", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  } catch (err) {
    dispatch({
      type: CHANGE_PASSWORD_ERROR,
      payload: err,
    });
    toast.error("An error has occured", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
    });
  }
};

export const changeEmail = (email, pass) => async (dispatch) => {
  try {
    var data = {
      email: email,
      pass: pass,
    };

    API.updateEmail(data)
      .then((res) => {
        dispatch({
          type: CHANGE_EMAIL,
        });
        toast.success("Email changed !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: CHANGE_EMAIL_ERROR,
          payload: err,
        });
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  } catch (err) {
    dispatch({
      type: CHANGE_EMAIL_ERROR,
      payload: err,
    });
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
    });
  }
};

export const logout = () => async (dispatch) => {
  API.logout().then((res) => {
    toast.success("You are now logged out !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
    });
    dispatch({
      type: LOGOUT,
    });
  });
};

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
        toast.success("Success !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: LOGIN_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: LOGIN_ERROR,
      payload: err,
    });
  }
};

export const changePassword = (pass) => async (dispatch) => {
  try {
    var data = {
      pass: pass,
    };

    API.updatePassword(data)
      .then((res) => {
        dispatch({
          type: CHANGE_PASSWORD,
        });
      })
      .catch((err) => {
        dispatch({
          type: CHANGE_PASSWORD_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: CHANGE_PASSWORD_ERROR,
      payload: err,
    });
  }
};

export const changeEmail = (email) => async (dispatch) => {
  try {
    var data = {
      email: email,
    };

    API.updateEmail(data)
      .then((res) => {
        dispatch({
          type: CHANGE_EMAIL,
        });
      })
      .catch((err) => {
        dispatch({
          type: CHANGE_EMAIL_ERROR,
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: CHANGE_EMAIL_ERROR,
      payload: err,
    });
  }
};

export const logout = () => async (dispatch) => {
  API.logout().then((res) => {
    dispatch({
      type: LOGOUT,
    });
  });
};

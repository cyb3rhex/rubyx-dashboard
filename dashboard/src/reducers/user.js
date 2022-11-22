import { LOGIN, LOGIN_ERROR, LOGOUT, CHANGE_PASSWORD, CHANGE_PASSWORD_ERROR } from "../constants/user";

const initialState = {
  loading: true,
  error: "",
  data: null,
  token: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: false,
        data: action.payload.User,
        token: action.payload.Token,
        error: "",
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        token: null,
        error: action.payload,
      };
      case CHANGE_PASSWORD:
        return {
          ...state,
          loading: false,
          error: "",
        };
      case CHANGE_PASSWORD_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        data: null,
        token: null,
        error: ""
      };
    default:
      return state;
  }
}

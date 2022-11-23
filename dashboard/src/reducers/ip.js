import {
  GET_IP,
  GET_IP_ERROR,
  CREATE_IP,
  CREATE_IP_ERROR,
  DELETE_IP,
  DELETE_IP_ERROR,
  UPDATE_IP,
  UPDATE_IP_ERROR,
} from "../constants/ip";

const initialState = {
  loading: true,
  error: "",
  ips: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_IP:
      return {
        ...state,
        loading: false,
        ips: action.payload,
        error: "",
      };
    case CREATE_IP_ERROR:
      return {
        ...state,
        loading: false,
        ips: null,
        error: action.payload,
      };
    case UPDATE_IP:
      return {
        ...state,
        loading: false,
        ips: action.payload,
        error: "",
      };
    case UPDATE_IP_ERROR:
      return {
        ...state,
        loading: false,
        ips: null,
        error: action.payload,
      };
    case GET_IP:
      return {
        ...state,
        loading: false,
        ips: action.payload,
        error: "",
      };
    case GET_IP_ERROR:
      return {
        ...state,
        loading: false,
        ips: null,
        error: action.payload,
      };
    case DELETE_IP:
      return {
        ...state,
        loading: false,
        ips: action.payload,
        error: "",
      };
    case DELETE_IP_ERROR:
      return {
        ...state,
        loading: false,
        ips: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

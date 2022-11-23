import {
  GET_SUBDOMAIN,
  GET_SUBDOMAIN_ERROR,
  CREATE_SUBDOMAIN,
  CREATE_SUBDOMAIN_ERROR,
  DELETE_SUBDOMAIN,
  DELETE_SUBDOMAIN_ERROR,
  UPDATE_SUBDOMAIN,
  UPDATE_SUBDOMAIN_ERROR,
} from "../constants/subdomain";

const initialState = {
  loading: true,
  error: "",
  subdomains: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_SUBDOMAIN:
      return {
        ...state,
        loading: false,
        subdomains: action.payload,
        error: "",
      };
    case CREATE_SUBDOMAIN_ERROR:
      return {
        ...state,
        loading: false,
        subdomains: null,
        error: action.payload,
      };
    case UPDATE_SUBDOMAIN:
      return {
        ...state,
        loading: false,
        subdomains: action.payload,
        error: "",
      };
    case UPDATE_SUBDOMAIN_ERROR:
      return {
        ...state,
        loading: false,
        subdomains: null,
        error: action.payload,
      };
    case GET_SUBDOMAIN:
      return {
        ...state,
        loading: false,
        subdomains: action.payload,
        error: "",
      };
    case GET_SUBDOMAIN_ERROR:
      return {
        ...state,
        loading: false,
        subdomains: null,
        error: action.payload,
      };
    case DELETE_SUBDOMAIN:
      return {
        ...state,
        loading: false,
        subdomains: action.payload,
        error: "",
      };
    case DELETE_SUBDOMAIN_ERROR:
      return {
        ...state,
        loading: false,
        subdomains: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

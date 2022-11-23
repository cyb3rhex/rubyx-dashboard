import {
  GET_REVENUE,
  GET_REVENUE_ERROR,
  CREATE_REVENUE,
  CREATE_REVENUE_ERROR,
  DELETE_REVENUE,
  DELETE_REVENUE_ERROR,
  UPDATE_REVENUE,
  UPDATE_REVENUE_ERROR,
} from "../constants/revenue";

const initialState = {
  loading: true,
  error: "",
  revenues: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_REVENUE:
      return {
        ...state,
        loading: false,
        revenues: action.payload,
        error: "",
      };
    case CREATE_REVENUE_ERROR:
      return {
        ...state,
        loading: false,
        revenues: null,
        error: action.payload,
      };
    case UPDATE_REVENUE:
      return {
        ...state,
        loading: false,
        revenues: action.payload,
        error: "",
      };
    case UPDATE_REVENUE_ERROR:
      return {
        ...state,
        loading: false,
        revenues: null,
        error: action.payload,
      };
    case GET_REVENUE:
      return {
        ...state,
        loading: false,
        revenues: action.payload,
        error: "",
      };
    case GET_REVENUE_ERROR:
      return {
        ...state,
        loading: false,
        revenues: null,
        error: action.payload,
      };
    case DELETE_REVENUE:
      return {
        ...state,
        loading: false,
        revenues: action.payload,
        error: "",
      };
    case DELETE_REVENUE_ERROR:
      return {
        ...state,
        loading: false,
        revenues: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

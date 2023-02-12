import {
  GET_STATS,
  GET_STATS_ERROR,
  RELOAD_STAT,
  RELOAD_STAT_ERROR,
} from "../constants/stat";

const initialState = {
  loading: true,
  error: "",
  stats: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RELOAD_STAT:
      return {
        ...state,
        loading: false,
        stats: action.payload,
        error: "",
      };
    case RELOAD_STAT_ERROR:
      return {
        ...state,
        loading: false,
        stats: null,
        error: action.payload,
      };
    case GET_STATS:
      return {
        ...state,
        loading: false,
        stats: action.payload,
        error: "",
      };
    case GET_STATS_ERROR:
      return {
        ...state,
        loading: false,
        stats: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

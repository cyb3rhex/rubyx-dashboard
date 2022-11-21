import { GET_USER, GET_USER_ERROR } from "../constants/user";

const initialState = {
  loading: true,
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
      };
    default:
      return state;
  }
}

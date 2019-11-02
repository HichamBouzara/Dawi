import isEmpty from '../utils/is-empty';

import {
  SET_CURRENT_USER,
  UPDATE_USER,
  USER_LOADING,
  GET_CODE,
  CONFIRM_USER,
  GET_ERRORS,
  SUBSCRIBE_USER,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
  error: {},
  code: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload.status === 'authenticated',
        user: action.payload,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CODE:
      return {
        ...state,
        code: action.payload,
      };
    case CONFIRM_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SUBSCRIBE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

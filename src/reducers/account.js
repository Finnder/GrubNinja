import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REQUEST_NEW_TOKEN,
  ACKNOWLEDGE_TOKEN,
  SET_INTERVAL_POINTER,
  RESET_ACCOUNT_STATE
} from '../constants/types';

const initialState = {
  username: null,
  password: null,
  isLoggedIn: false,
  tokenRefreshRequired: false,
  initialFetched: false,
  intervalPointer: null,
  loading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoggedIn: true,
        initialFetched: true,
        loading: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        username: null,
        password: null,
        isLoggedIn: false,
        tokenRefreshRequired: true,
        loading: false
      };
    case ACKNOWLEDGE_TOKEN:
      return {
        ...state,
        tokenRefreshRequired: false
      };
    case REQUEST_NEW_TOKEN:
      return {
        ...state,
        intervalPointer: payload,
        tokenRefreshRequired: true
      };
    case SET_INTERVAL_POINTER:
      return {
        ...state,
        intervalPointer: payload
      };
    case RESET_ACCOUNT_STATE:
      clearInterval(state.intervalPointer);
      return initialState;
    default:
      return state;
  }
}

import constants from '../constants';
import { authentication as initialState } from '../initialState';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SIGN_OUT:
      return {
        ...state,
        authenticated: false
      };

    case constants.AUTHENTICATE:
      return {
        ...state,
        authenticated: true
      };

    case constants.AUTH_FAIL:
      return {
        ...state,
        authenticated: false,
        error: action.payload,
      }

    default:
      return state;
  }
}

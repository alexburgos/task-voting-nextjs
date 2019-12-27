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

    default:
      return state;
  }
}

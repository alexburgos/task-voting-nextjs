import constants from '../constants';
import { user as initialState } from '../initialState';

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_USER:
      return {
        ...state,
        ...action.user
      };
    case constants.POLL_VOTE:
      return {
        ...state,
        ...action.user,
      };
    default:
      return state;
  }
}

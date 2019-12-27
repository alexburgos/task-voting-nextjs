import constants from '../constants';
import { polls as initialState } from '../initialState';

export default function pollsReducer(state = initialState, action) {
  switch (action.type) {
    case constants.VIEW_POLLS:
      return state;
    default:
      return state;
  }
}

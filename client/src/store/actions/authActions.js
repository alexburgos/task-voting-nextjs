import constants from '../constants';

export default {
  authenticate() {
    return {
      type: constants.AUTHENTICATE
    };
  },
  authFail(error) {
    return {
      type: constants.AUTH_FAIL,
      payload: error
    }
  },
  signOut() {
    return {
      type: constants.SIGN_OUT
    };
  }

};

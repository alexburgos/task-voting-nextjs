import constants from '../constants';

export default {
  authenticate() {
    return {
      type: constants.AUTHENTICATE
    };
  },
  signOut() {
    return {
      type: constants.SIGN_OUT
    };
  }

};

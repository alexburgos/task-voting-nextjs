import constants from '../constants';

export default {

  setUser(user) {
    return {
      type: constants.SET_USER,
      user
    };
  },

  viewUserPolls(user) {
    return {}
  }

};

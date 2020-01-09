require('dotenv').config();

module.exports = {
  env: {
    MONGODB_URI: process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/planning-poker',
  },
};
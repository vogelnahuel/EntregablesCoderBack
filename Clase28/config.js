const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  user: process.env.USER,
  pass: process.env.PASS,
};
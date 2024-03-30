const dotenv = require("dotenv");
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN_DAYS = parseInt(process.env.JWT_EXPIRES_IN_DAYS);

module.exports = {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
  JWT_EXPIRES_IN_DAYS,
};

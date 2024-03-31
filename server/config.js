const dotenv = require("dotenv");
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN_DAYS = parseInt(process.env.JWT_EXPIRES_IN_DAYS);

const CF_CLIENT_APP_ID = process.env.CF_CLIENT_APP_ID;
const CF_CLIENT_SECRET_KEY = process.env.CF_CLIENT_SECRET_KEY;

const CF_API_VERSION = process.env.CF_API_VERSION;

const MONGODB_URI = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
).replace("<username>", process.env.DATABASE_USER);

module.exports = {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
  JWT_EXPIRES_IN_DAYS,
  CF_CLIENT_APP_ID,
  CF_CLIENT_SECRET_KEY,
  MONGODB_URI,
  CF_API_VERSION,
};

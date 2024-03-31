const CLIENT_ID =
  "1069235369565-o24uv2h2mnupom9rj58tfkjc6kifoatg.apps.googleusercontent.com";

const BASE_URL = "http://localhost:3000";
const USER_LOGIN_ROUTE = `${BASE_URL}/api/v1/auth/login`;
const USER_LOGOUT_ROUTE = `${BASE_URL}/api/v1/auth/logout`;
const LOGIN_STATUS_ROUTE = `${BASE_URL}/api/v1/auth/login-status`;
const VEHICLE_ROUTE = `${BASE_URL}/api/v1/vehicle/`;
const STOP_ROUTE = `${BASE_URL}/api/v1/stop/`;

export {
  CLIENT_ID,
  BASE_URL,
  USER_LOGIN_ROUTE,
  USER_LOGOUT_ROUTE,
  LOGIN_STATUS_ROUTE,
  VEHICLE_ROUTE,
  STOP_ROUTE,
};

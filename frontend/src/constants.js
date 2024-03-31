const CLIENT_ID =
  "1069235369565-o24uv2h2mnupom9rj58tfkjc6kifoatg.apps.googleusercontent.com";

// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://gc-hackathon-2024.onrender.com";
const USER_LOGIN_ROUTE = `${BASE_URL}/api/v1/auth/login`;
const USER_LOGOUT_ROUTE = `${BASE_URL}/api/v1/auth/logout`;
const LOGIN_STATUS_ROUTE = `${BASE_URL}/api/v1/auth/login-status`;
const USER_UPDATE_ROUTE = `${BASE_URL}/api/v1/user`;

const VEHICLE_ROUTE = `${BASE_URL}/api/v1/vehicle/`;
const GET_ALL_VEHICLES = `${BASE_URL}/api/v1/vehicle`;

const STOP_ROUTE = `${BASE_URL}/api/v1/stop/`;
const GET_ALL_STOPS_ROUTE = `${BASE_URL}/api/v1/stop/`;

const PAYMENT_LINK_ROUTE = `${BASE_URL}/api/v1/payment/link`;
const GET_ALL_TRANSACTIONS_ROUTE = `${BASE_URL}/api/v1/transactions`;

const ADD_ROUTE_ROUTE = `${BASE_URL}/api/v1/route`;
const GET_ALL_ROUTES_ROUTE = `${BASE_URL}/api/v1/route`;

export {
  CLIENT_ID,
  BASE_URL,
  USER_LOGIN_ROUTE,
  USER_LOGOUT_ROUTE,
  LOGIN_STATUS_ROUTE,
  VEHICLE_ROUTE,
  STOP_ROUTE,
  GET_ALL_STOPS_ROUTE,
  USER_UPDATE_ROUTE,
  PAYMENT_LINK_ROUTE,
  GET_ALL_TRANSACTIONS_ROUTE,
  GET_ALL_VEHICLES,
  ADD_ROUTE_ROUTE,
  GET_ALL_ROUTES_ROUTE,
};

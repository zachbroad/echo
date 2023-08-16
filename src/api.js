// eslint-disable-next-line no-unused-vars

const LOCAL = "http://127.0.0.1:8000";
const PROD = "https://echo-usn3.onrender.com"

const BASE = PROD;

// AUTH FLOW ENDPOINTS
export const API_AUTH = BASE + "/spotify/auth/";
export const API_CALLBACK = BASE + "/spotify/callback/";

// USER DATA ENDPOINTS
export const API_ME = BASE + "/spotify/me/"; // profile
export const API_SETTINGS = BASE + "/spotify/settings/"; // profile
export const API_RECENTLYSAVED = BASE + "/spotify/recent/"; // top songs
export const API_DASHBOARD = BASE + "/spotify/dashboard/"; // top songs

export const API_UPDATEMYMAGAZINE = BASE + "/spotify/magazine/update/";
export const API_REFRESHUSERDATA = BASE + "/spotify/refresh/";

export const API_USERS = BASE + "/users/"; // top songs
export const API_USERDETAIL = (username) => API_DASHBOARD + username + "/";



const LOCAL = "http://127.0.0.1:8000";
const PROD = "https://echo-usn3.onrender.com"

const BASE = LOCAL;

// AUTH FLOW ENDPOINTS
export const API_AUTH = BASE + "/spotify/auth/";
export const API_CALLBACK = BASE + "/spotify/callback/";

// USER DATA ENDPOINTS
export const API_ME = BASE + "/spotify/me/"; // profile
export const API_RECENTLYSAVED = BASE + "/spotify/recent/"; // top songs
export const API_TOP = BASE + "/spotify/top/"; // top songs


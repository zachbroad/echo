// eslint-disable-next-line no-unused-vars

import {generateCodeChallenge, generateRandomString} from "./util";

const LOCAL = "http://127.0.0.1:8000";
const PROD = "https://echo-usn3.onrender.com"

const BASE = LOCAL;

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


// REDIRECT USER TO SPOTIFY
export async function redirectAndAuthWithSpotify() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = 'http://127.0.0.1:3000';

  let codeVerifier = generateRandomString(128);

  await generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email user-library-read';

    localStorage.setItem('code_verifier', codeVerifier);

    let args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });
  });

  let json_data = null;
  await fetch(API_AUTH, {
    method: "GET",
    mode: "cors"
  })
    .then(response => {
      return response.json()
    })
    .then(responseJson => {
      return json_data = responseJson;
    })
    .catch(e => console.error(e))

  window.location = json_data.url;
}

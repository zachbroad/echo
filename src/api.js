import SpotifyWebApi from "spotify-web-api-js";

export function doWeHaveToken(token) {
    return (token !== "null" && token !== undefined)
}

export const SPOTIFY_API_KEY_NAME = "SPOTIFY_API_KEY";
export let spotifyApi = new SpotifyWebApi();
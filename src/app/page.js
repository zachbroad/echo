'use client'
import Image from 'next/image'
import {useEffect, useState} from "react";
import SpotifyWebApi from "spotify-web-api-js";


function Header() {
    return (
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <div>
                <h1 style={{fontWeight: "bold"}}>ECHO</h1>
                <h3>MIRRORING YOUR MUSIC</h3>
            </div>

        </div>
    )
}


/*
 * HomePage -> Connect Spotify -> Store API creds/auth token whatever in cookies/securestorage
 *
 * HomePage (not logged in) -> show connect spotify
 *
 * HomePage (logged in) -> just show top 4x4 recent liked songs in a grid
 */

const SPOTIFY_API_KEY_NAME = "SPOTIFY_API_KEY";


let spotifyApi = new SpotifyWebApi();

export default function HomePage() {
    const [spotifyAccessToken, setSpotifyAccessToken] = useState();

    function HomePageConnectSpotify() {
        return (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-7 ">
                <div className="mb-4">
                    <span className="block text-gray-700 text-lg font-bold mb-2">ECHO for Spotify</span>
                    <p className="text-gray-700 text-base">Experience your Spotify listening history like never before.
                        Visualize, reflect, and share your musical journey with ECHO.</p>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => getAccessToken()}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">FORCE
                        GET TOKEN
                    </button>
                    <a href="https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=YOUR_SCOPES"
                       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Connect
                        Your Spotify</a>
                </div>
            </div>
        )
    }

    function HomePageLoggedIn() {
        return (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-7 ">
                <div className="mb-4">
                    <span className="block text-gray-700 text-lg font-bold mb-2">Logged in!</span>
                    <p className="text-gray-700 text-base">Welcome to ECHO</p>
                </div>
                <div className="flex items-center justify-between">
                    <p>Access Token: {spotifyAccessToken}</p>
                </div>
                <div className="mt-5">
                    <button
                        onClick={() => logOut()}
                        className="mr-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Log out
                    </button>
                    <a href=""
                       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Import library
                    </a>
                </div>
            </div>
        )
    }


    function getAccessToken() {
        const body = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
        });
        console.dir(body);

        fetch(
            'https://accounts.spotify.com/api/token', {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "POST",
                body: body
            }
        )
            .then(r => r.json())
            .then(data => {
                let token = data['access_token']
                localStorage.setItem(SPOTIFY_API_KEY_NAME, token)
                setSpotifyAccessToken(token);
            })
            .catch(e => {
                console.error(e);
            });
    }

    useEffect(() => {
        const key = localStorage.getItem(SPOTIFY_API_KEY_NAME);
        console.log(process.env);

        if (key !== null) {
            setSpotifyAccessToken(key);
        } else {
            getAccessToken();
        }
    }, []);


    function logOut() {
        localStorage.setItem(SPOTIFY_API_KEY_NAME, null);
        setSpotifyAccessToken(null);
    }

    useEffect(() => {
    }, []);

    const getApi = () => {
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <Header/>
            {(spotifyAccessToken !== null) ?
                <HomePageLoggedIn/> :
                <HomePageConnectSpotify/>
            }
        </main>
    )
}


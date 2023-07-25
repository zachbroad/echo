import logo from './logo.svg';
import './App.css';

import {useEffect, useState} from "react";
import SpotifyWebApi from "spotify-web-api-js";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, DropdownButton, Row, Dropdown} from "react-bootstrap";

function doWeHaveToken(token) {
    return (token !== "null" && token !== undefined)
}

function Header({username, logOut}) {

    // REDIRECT USER TO SPOTIFY
    async function redirectAndAuthWithSpotify() {
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

            window.location = 'https://accounts.spotify.com/authorize?' + args;
        });
    }


    const reflectionStyle = {
        transform: 'scaleX(-1)', // Flip horizontally
        color: 'rgba(0, 0, 0, 0.1)', // Lighter color for reflection
        display: 'inline-block',
        marginLeft: '0.5rem',
        margin: 0
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container d-flex align-items-center">
                <a className="navbar-brand" href="/">
                    <span style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <h1 style={{margin: 0}} className="font-weight-bold">ECHO</h1>
                        <h1 style={reflectionStyle} className="font-weight-bold">ECHO</h1>
                    </span>
                    <h6 style={{margin: 0, display: "inline-block"}}>MIRRORING YOUR MUSIC</h6>
                </a>
                <div className="ml-auto">
                    {username ? (
                        <DropdownButton variant="outline-secondary" id="dropdown-basic-button"
                                        title={`Welcome, ${username}`}>
                            <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
                        </DropdownButton>
                    ) : (
                        <DropdownButton variant="outline-secondary" id="dropdown-basic-button" title="Log in">
                            <Dropdown.Item
                                onClick={() => redirectAndAuthWithSpotify()}
                            >
                                Log in with Spotify
                            </Dropdown.Item>
                        </DropdownButton>
                    )}
                </div>
            </div>
        </nav>
    );
}

function ShowSavedTracks() {
    const [tracks, setTracks] = useState();

    useEffect(() => {
        if (localStorage.getItem("access_token") === "null") return;
        console.dir(localStorage.getItem("access_token"))
        console.dir('hi')

        spotifyApi.setAccessToken(localStorage.getItem("access_token"))
        var t = spotifyApi.getMySavedTracks(
            {limit: 36,}
        ).then((d) => {
            setTracks(d.items);
            console.dir(d.items)
        })
    }, [])

    return (
        <div>
            {tracks ? (
                <div style={{display: "grid", gridTemplateColumns: "repeat(6, 125px)"}}>
                    {tracks.map((track, index) => (
                        <img
                            key={index}
                            src={track.track.album.images[0].url}
                            height={125}
                            width={125}
                            alt={track.track.name}
                        />
                    ))}
                </div>
            ) : (
                <p>Loading tracks...</p>
            )}
        </div>

    )
}


function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
}

const SPOTIFY_API_KEY_NAME = "SPOTIFY_API_KEY";
let spotifyApi = new SpotifyWebApi();

function HomePageConnectSpotify() {
    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-7 ">
            <div className="mb-4">
                <span className="block text-gray-700 text-lg font-bold mb-2">ECHO for Spotify</span>
                <p className="text-gray-700 text-base">Experience your Spotify listening history like never before.
                    Visualize, reflect, and share your musical journey with ECHO.</p>
            </div>
        </div>
    )
}

function HomePageLoggedIn() {
    return (
        <Row>
            <Col>
                <ShowSavedTracks/>
            </Col>
        </Row>
    )
}

export default function HomePage() {

    const [token, setToken] = useState(localStorage.getItem("access_token"));

    const [username, setUsername] = useState(null);

    function logOut() {
        localStorage.setItem("access_token", null);
        setToken(null);
        setUsername(null);
    }

    function getUsername() {
        if (!localStorage.getItem("access_token")) return;
        spotifyApi.setAccessToken(localStorage.getItem("access_token"));
        spotifyApi.getMe()
            .then(d => {
                setUsername(d.display_name);
            })
            .catch(e => {
                console.error(e);
            });
    }

    useEffect(() => {
    }, [token]);

    useEffect(() => {
        getUsername()
    }, [token]);

    // SPOTIFY CALLBACK
    useEffect(() => {
        // Check if on the client-side before using useRouter
        if (typeof window !== 'undefined') {
            // we hope this gets called on callback
            const queryParams = new URLSearchParams(window.location.search);

            const code = queryParams.get('code');
            const state = queryParams.get('state');

            if (code == null || state == null) return;

            let codeVerifier = localStorage.getItem('code_verifier');

            const clientId = process.env.REACT_APP_CLIENT_ID;
            const redirectUri = 'http://127.0.0.1:3000';

            let bodyData = {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                client_id: clientId,
                code_verifier: codeVerifier
            }
            let body = new URLSearchParams(bodyData);

            console.dir(bodyData)

            fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('HTTP status ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.dir(data);
                    localStorage.setItem('access_token', data.access_token);
                    setToken(data.access_token);
                    spotifyApi.setAccessToken(data.access_token);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    }, []); // Add router.query as a dependency to the useEffect hook

    return (
        <>
            <Header logOut={logOut} username={username}/>
            <Container className="">
                {token !== null && token !== "null" ?
                    <HomePageLoggedIn/> :
                    <HomePageConnectSpotify/>
                }
            </Container>
        </>
    )
}



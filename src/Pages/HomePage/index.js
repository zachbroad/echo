import React, {useEffect, useState} from "react";
import {spotifyApi} from "../../api";
import Header from "../../Components/Header";
import {TrackGrid} from "../../Components/TrackGrid";
import {Col, Container, Row} from "react-bootstrap";
import Player from "../../Components/Player";
import UserCreatedDisplay from "../../Components/UserCreatedDisplay";

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
                <UserCreatedDisplay/>
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
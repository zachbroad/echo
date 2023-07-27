import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {spotifyApi} from "../api";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
    const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);

    const logout = () => {
        setIsLoggedIn(false);
        setAccessToken(null);
        localStorage.removeItem("access_token");
    }


    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setAccessToken(localStorage.getItem("access_token"))
        }
    }, []);


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
                    setAccessToken(data.access_token);
                    setIsLoggedIn(true);
                    console.log("GOT TOKEN: " + data.access_token)
                    spotifyApi.setAccessToken(data.access_token);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    }, []); // Add router.query as a dependency to the useEffect hook

    return (
        <AuthContext.Provider value={{isLoggedIn, accessToken, logout, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};


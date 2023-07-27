import React, {createContext, useContext, useEffect, useState} from "react";
import {API_CALLBACK, API_ME} from "../api";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile")));
    // const [profile, setProfile] = useState(localStorage.getItem("profile"));

    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
        setProfile(null);
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
    }

    const getUserProfile = async (t) => {
        try {
            const response = await fetch(API_ME, {
                headers: {
                    "Authorization": `Token ${t}`
                }
            });
            const data = await response.json();

            setProfile(data);
            localStorage.setItem("profile", JSON.stringify(data));
        } catch (e) {
            console.error(e);
        }
    }


    // SPOTIFY CALLBACK
    useEffect(() => {
        // TODO: return if logged in
        // TODO: figure out why error & why it gets called twice


        // Check if on the client-side before using useRouter
        if (typeof window !== 'undefined') {
            // we hope this gets called on callback

            const queryParams = new URLSearchParams(window.location.search);

            const code = queryParams.get('code');
            // const state = queryParams.get('state');jjj

            if (code == null) return;

            const CALLBACK_URL = new URL(API_CALLBACK);
            CALLBACK_URL.searchParams.append("code", code);
            const getToken = async () => {
                try {
                    const response = await fetch(CALLBACK_URL);
                    if (!response.ok) throw new Error('HTTP status: ' + response.status)

                    const data = await response.json();
                    console.log(data.token)
                    localStorage.setItem("token", data.token);
                    await setToken(data.token);
                    await getUserProfile(data.token);
                    setIsLoggedIn(true);
                } catch (e) {
                    console.error(e);
                }
            }

            getToken();
        }

    }, []); // Add router.query as a dependency to the useEffect hook


    useEffect(() => {
        console.dir(profile);
    }, []);

    return (
        <AuthContext.Provider value={{token, isLoggedIn, logout, profile}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};


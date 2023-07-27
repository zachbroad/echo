import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App.js";
import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import {PlayerProvider} from "./Components/Player";
import UserDashboard from "./Pages/UserDashboard";
import {AuthProvider} from "./Components/Auth";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/dashboard/",
        element: <UserDashboard/>
    }
])

root.render(
    <React.StrictMode>
        <AuthProvider>
            <div className="app-wrapper d-flex flex-column" style={{height: '100vh'}}>
                <PlayerProvider>
                    <RouterProvider router={router}/>
                </PlayerProvider>
            </div>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

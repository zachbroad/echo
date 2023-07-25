import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from "./Pages/HomePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {PlayerProvider} from "./Components/Player";
import React from "react";


export default function App() {
    return (
        <div className="app-wrapper d-flex flex-column" style={{height: '100vh'}}>
            <PlayerProvider>
                <div className="main-content">
                    <HomePage/>
                </div>
            </PlayerProvider>
        </div>
    )
}


import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from "./Pages/HomePage";
import {PlayerProvider} from "./Components/Player";
import UserDashboard from "./Pages/UserDashboard";

export default function App() {
    return (
        // <div className="main-content">
            <Routes>
                <Route path="/" exact component={HomePage}/>
                <Route path="/dashboard" component={UserDashboard}/>
            </Routes>
        // </div>
    )
}

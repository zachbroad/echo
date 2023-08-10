import React from "react";
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from "./Pages/HomePage";
import UserDashboard from "./Pages/UserDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" exact component={HomePage}/>
      <Route path="/dashboard" component={UserDashboard}/>
    </Routes>
  )
}

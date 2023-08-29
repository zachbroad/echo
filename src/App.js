import React from "react";


// Global styling
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.scss'
import './App.scss';

// Providers
import {AuthProvider} from "./Components/Auth/Auth";

// Toaster oven
import {ToastContainer} from "react-toastify";
import RoutesComponent from "./Router";


export default function App() {
  return (
    <AuthProvider>
      <div className="main-content">
        <div className="app-wrapper d-flex flex-column">
          <RoutesComponent/>
        </div>
      </div>
      {/* Same as */}
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  )
}

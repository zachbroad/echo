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
import {AuthProvider, useAuth} from "./Components/Auth";

// Toaster oven
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Explore from "./Pages/Explore";
import UserDetail from "./Pages/UserDetail";
import {API_ME, API_DASHBOARD, API_USERDETAIL, API_SETTINGS, API_USERS} from "./api";
import UserSettings from "./Pages/UserSettings";
import Loading from "./Components/Loading";
import ErrorPage from "./Pages/ErrorPage";


const root = ReactDOM.createRoot(document.getElementById('root'));

function RoutesComponent() {
  const {token, isLoggedIn, logout, profile} = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>
    },
    {
      path: "/dashboard/",
      element: <UserDashboard/>,
      loader: async ({request, params}) => {
        const dResponse = await fetch(API_DASHBOARD, {
          headers: {
            "Authorization": `Token ${token}`
          }
        });
        const d = await dResponse.json();

        const profileResponse = await fetch(API_ME, {
          headers: {
            "Authorization": `Token ${token}`
          }
        });
        const userProfile = await profileResponse.json();

        return {
          "data": d,
          "profile": userProfile
        };
      },
      pending: <Loading />,
      errorElement: <ErrorPage />
    },
    {
      path: "/explore/",
      element: <Explore/>,
      loader: async ({request, params}) => {
        const response = await fetch(API_USERS, {
            headers: {
              "Authorization": `Token ${token}`
            }
          }
        );
        const jsonData = await response.json();

        if (!response.ok) {
          return [null, `${response.status} - ${response.statusText}`];
        }

        return [jsonData, null];
      },
      errorElement: <ErrorPage />
    },
    {
      path: "/explore/:username/",
      element: <UserDetail/>,
      loader: async ({request, params}) => {
        const response = await fetch(API_USERDETAIL(params.username), {
          headers: {
            "Authorization": `Token ${token}`
          }
        });
        const userDetailData = await response.json();

        if (!response.ok) {
          return [null, `${response.status} - ${response.statusText}`]
        }

        return [userDetailData, null];
      },
      errorElement: <ErrorPage />
    },
    {
      path: "/settings/",
      element: <UserSettings/>,
      loader: async ({request, params}) => {
        const response = await fetch(API_SETTINGS, {
          headers: {
            "Authorization": `Token ${token}`
          }
        });
        const userSettingsData = await response.json();
        return userSettingsData;
      },
      errorElement: <ErrorPage />
    },
  ]);

  return <RouterProvider router={router}/>;
}


root.render(
  <React.StrictMode>
    <AuthProvider>
      <div className="main-content">
        <div className="app-wrapper d-flex flex-column" style={{height: '100vh'}}>
          <PlayerProvider>
            <RoutesComponent/>
          </PlayerProvider>
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

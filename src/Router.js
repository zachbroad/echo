import React from "react";

import {API_DASHBOARD, API_ME, API_SETTINGS, API_USERDETAIL, API_USERS} from "./api";
import {useAuth} from "./Components/Auth/Auth";

import {createBrowserRouter} from "react-router-dom";
import {RouterProvider} from "react-router";

import HomePage from "./Pages/HomePage";
import UserDashboard from "./Pages/UserDashboard";
import LoadingPage from "./Pages/LoadingPage";
import ErrorPage from "./Pages/ErrorPage";
import Explore from "./Pages/Explore/Explore";
import UserDetail from "./Pages/UserDetail";
import UserSettings from "./Pages/UserSettings";

import Player, {PlayerProvider} from "./Components/Player/Player";
import BottomNav from "./Components/BottomNav/BottomNav";
import UserDashboardLoadingPage from "./Pages/UserDashboardLoadingPage";
import EULA from "./Pages/EULA";
import PrivacyPolicy from "./Pages/PrivacyPolicy";

function RoutesComponent({children}) {
  const {token, isLoggedIn, logout, profile} = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>
    },
    {
      path: "/eula/",
      element: <EULA/>
    },
    {
      path: "/privacy/",
      element: <PrivacyPolicy/>
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
      pending: <UserDashboardLoadingPage/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/explore/",
      element: <Explore/>,
      loader: async ({request, params}) => {
        let headers = null;
        if (!token == null) {
          headers =  {
            "Authorization": `Token ${token}`
          }
        } else {
          headers = null;
        }
        const response = await fetch(API_USERS, {
            headers: {...headers}
          }
        );
        const jsonData = await response.json();

        if (!response.ok) {
          return [null, `${response.status} - ${response.statusText}`];
        }

        return [jsonData, null];
      },
      errorElement: <ErrorPage/>,
      pending: <LoadingPage/>,
    },
    {
      path: "/explore/:username/",
      element: <UserDetail/>,
      loader: async ({request, params}) => {
        let headers = null;
        if (!token == null) {
          headers =  {
            "Authorization": `Token ${token}`
          }
        } else {
          headers = null;
        }
        const response = await fetch(API_USERDETAIL(params.username), {
          headers: {...headers}
        });
        console.dir(response);
        const userDetailData = await response.json();

        if (!response.ok) {
          console.log('Error')
          console.dir(response);
          return [null, `${response.status} - ${response.statusText}`]
        }

        return [userDetailData, null];
      },
      errorElement: <ErrorPage/>,
      pending: <LoadingPage/>,
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
      errorElement: <ErrorPage/>,
      pending: <LoadingPage/>
    },
  ]);

  return (
    <PlayerProvider>
      <RouterProvider router={router}>
        {children}
      </RouterProvider>
    </PlayerProvider>
  );
}

export default RoutesComponent;
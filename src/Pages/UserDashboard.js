import React from "react";
import {Container} from "react-bootstrap";
import {useLoaderData, useNavigation} from "react-router";
import {useAuth} from "../Components/Auth/Auth";
import LoadingPage from "./LoadingPage";
import Layout from "../Components/Layout/Layout";
import UserDashboardView from "../Components/UserDashboard/UserDashboardView";

import './UserDashboard.scss'
import UserDashboardLoadingPage from "./UserDashboardLoadingPage";

export default function UserDashboard() {
  const {token, isLoggedIn, logout, myProfile, isLoggingIn} = useAuth();
  const {data, profile} = useLoaderData(null, null);
  const navigation = useNavigation();


  const ViewWhenUnauth = () => (
    <Layout>
      <Container>
        <h3>
          You are not logged in
        </h3>
      </Container>
    </Layout>
  );

  if (isLoggingIn || (data.tracks_long === undefined && isLoggedIn)) {
    return <UserDashboardLoadingPage/>;
  }

  if (!isLoggedIn) {
    return <ViewWhenUnauth/>;
  }

  return (
    <UserDashboardView data={data}/>
  )

}
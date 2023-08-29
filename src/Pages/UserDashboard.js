import React from "react";
import {Container} from "react-bootstrap";
import {useLoaderData, useNavigation} from "react-router";
import {useAuth} from "../Components/Auth/Auth";
import LoadingPage from "./LoadingPage";
import Layout from "../Components/Layout/Layout";
import UserDashboardView from "../Components/UserDashboard/UserDashboardView";

import './UserDashboard.scss'

export default function UserDashboard() {
  const {token, isLoggedIn, logout, myProfile} = useAuth();
  const {data, profile} = useLoaderData();
  const navigation = useNavigation();

  const ViewWhenUnauth = () => (
    <div>
      <Container>
        <h3>
          You are not logged in
        </h3>
      </Container>
    </div>
  );

  return (
    <Layout>
      {navigation.state === "loading" && <LoadingPage/>}
      {!isLoggedIn ? <ViewWhenUnauth/> : <UserDashboardView data={data}/>}
    </Layout>
  )
}
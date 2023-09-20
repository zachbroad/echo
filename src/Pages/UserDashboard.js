import React from "react";
import {Button, Col, Container} from "react-bootstrap";
import {useLoaderData, useNavigation} from "react-router";
import {useAuth} from "../Components/Auth/Auth";
import LoadingPage from "./LoadingPage";
import Layout from "../Components/Layout/Layout";
import UserDashboardView from "../Components/UserDashboard/UserDashboardView";

import './UserDashboard.scss'
import UserDashboardLoadingPage from "./UserDashboardLoadingPage";
import {redirectAndAuthWithSpotify} from "../api";

export default function UserDashboard() {
  const {token, isLoggedIn, logout, myProfile, isLoggingIn} = useAuth();
  const {data, profile} = useLoaderData(null, null);
  const navigation = useNavigation();


  const ViewWhenUnauth = () => (
    <Layout>
      <Container>
        <div className="d-flex justify-content-center align-items-center vh-100 pb-5">
          <Col className="align-items-center text-center" style={{padding: 0}}>
            <h3 className="mb-3">PLEASE LOGIN TO VIEW THIS PAGE</h3>
            <Button
              onClick={() => redirectAndAuthWithSpotify()}
              className="me-2"
              variant="success"
            >
              Connect your Spotify
            </Button>
          </Col>
        </div>
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
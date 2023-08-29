import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {redirectAndAuthWithSpotify} from "../api";
import {useAuth} from "../Components/Auth/Auth";
import Layout from "../Components/Layout/Layout";
import './HomePage.scss';

function HomePageConnectSpotify() {



  return (
    <Container className="mx-2 my-auto homepage-container d-flex">
      <Row className={""}>
        <Col className={""} style={{padding: 0}}>
          <h1>ECHO</h1>
          <h3>YOUR SPOTIFY — VISUALIZED</h3>
          <Button onClick={() => redirectAndAuthWithSpotify()} className="me-2" variant="dark">Connect your Spotify</Button>
        </Col>
      </Row>
    </Container>
  )
}

function HomePageLoggedIn() {
  const {token, isLoggedIn, logout, profile} = useAuth();


  return (
    <Container className="mx-2 my-auto homepage-container">
      <Row>
        <Col style={{padding: 0}}>
          <h1>ECHO</h1>
          <h3>YOUR SPOTIFY — VISUALIZED</h3>
          <p>Welcome back, @{profile.display_name}.</p>
          <Button as={Link} to={"/dashboard/"} className="me-2" variant="dark">Your Dashboard</Button>
          <Button as={Link} to={"/explore/"} className="me-2" variant="dark">Explore</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default function HomePage() {
  const {token, isLoggedIn, logout, profile} = useAuth();

  return (
    <Layout>
      {isLoggedIn ?
        <HomePageLoggedIn/> :
        <HomePageConnectSpotify/>
      }
    </Layout>
  )
}
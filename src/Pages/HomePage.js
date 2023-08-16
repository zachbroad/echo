import React, {useEffect, useState} from "react";
import Header from "../Components/Header";
import {Col, Container, Row} from "react-bootstrap";
import TrackDisplayWithGridAndList from "../Components/TrackDisplayWithGridAndList";
import {useAuth} from "../Components/Auth";

function HomePageConnectSpotify() {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-7 ">
      <div className="mb-4">
        {/*<span className="block text-gray-700 text-lg font-bold mb-2">ECHO for Spotify</span>*/}
        {/*<p className="text-gray-700 text-base">Experience your Spotify listening history like never before.*/}
        {/*  Visualize, reflect, and share your musical journey with ECHO.</p>*/}
      </div>
    </div>
  )
}

function HomePageLoggedIn() {
  const {token, isLoggedIn, logout, profile} = useAuth();

  return (
    <Container className="mx-2">
      <Row>
        <Col style={{padding: 0}}>
          <h1>ECHO</h1>
          <h3>YOUR SPOTIFY — VISUALIZED</h3>
          <p>Welcome back, @{profile.display_name}.</p>

        </Col>
      </Row>
    </Container>
  )
}

export default function HomePage() {
  const {token, isLoggedIn, logout, profile} = useAuth();

  return (
    <>
      <Header/>
      {isLoggedIn ?
        <HomePageLoggedIn/> :
        <HomePageConnectSpotify/>
      }
    </>
  )
}
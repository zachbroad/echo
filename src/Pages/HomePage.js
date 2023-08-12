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
  return (
    <Row>
      <Col style={{padding: 0}}>
        <TrackDisplayWithGridAndList/>
      </Col>
    </Row>
  )
}

export default function HomePage() {
  const {isLoggedIn, accessToken, logout, setAccessToken} = useAuth();

  return (
    <>
      <Header/>

      <Container fluid className="">
        {isLoggedIn ?
          <HomePageLoggedIn/> :
          <HomePageConnectSpotify/>
        }
      </Container>
    </>
  )
}
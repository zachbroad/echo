import {Card, Col, Container, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {API_USERS} from "../api";
import {useAuth} from "../Components/Auth";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import AlbumArtworkNode from "../Components/AlbumArtworkNode";
import {Link} from "react-router-dom";
import {useLoaderData} from "react-router";
import './Explore.scss';

function ExploreItem({user}) {

  if (user.recent == null) {
    return null;
  }


  return (
    <div key={user.username} className="explore-item">
      <div className="explore-item__header">
        <Link to={`/explore/${user.username}/`}>{user.username}</Link>
      </div>
      <div className="track-grid smallest">
        {user.recent.items.slice(0, 16).map(s => (
          <AlbumArtworkNode track={s.track} key={s.track.id}/>
        ))}
      </div>
    </div>
  )
}

export default function Explore() {
  const [users, error] = useLoaderData();

  const ViewUsersLoaded = () => (
    <div>
      <Container className="mt-4">
        <h2>Explore</h2>
        <Row className={"explore-container"}>
          {users.map(user => <ExploreItem user={user}/>)}
        </Row>
      </Container>
    </div>
  )

  return (
    <div>
      <Header/>
      <Container>
        {users ? <ViewUsersLoaded/> : <Loading/>}
        {error ? <p>{error}</p> : null}
      </Container>
    </div>
  )
}
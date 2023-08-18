import {Card, Col, Container, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {API_USERS} from "../api";
import {useAuth} from "../Components/Auth";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import AlbumArtworkNode from "../Components/AlbumArtworkNode";
import {Link} from "react-router-dom";
import {useLoaderData} from "react-router";

export default function UserList() {
  const [users, error] = useLoaderData();

  const ViewUsersLoaded = () => (
    <div>
      <Container className="mt-4">
        <h2>Explore</h2>
        <Row>
          {users.map(user => {
            return (
              user.recent != null ? (
                <Col sm="12" md="6" key={user.username}>
                  <div>
                    <Link to={`/users/${user.username}/`}>{user.username}</Link>
                    <div className="track-grid smallest">
                      {user.recent.items.slice(0, 16).map(s => (
                        <AlbumArtworkNode track={s.track} key={s.track.id}/>
                      ))}
                    </div>
                    <hr/>
                  </div>
                </Col>
              ) : null
            );
          })}
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
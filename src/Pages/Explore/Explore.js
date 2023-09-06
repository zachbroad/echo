import {Container} from "react-bootstrap";
import React from "react";
import LoadingPage from "../LoadingPage";
import {useLoaderData} from "react-router";

import Layout from "../../Components/Layout/Layout";
import styles from './explore.module.scss';
import Album from "../../Components/Album/Album";

export default function Explore() {
  const [users, error] = useLoaderData();

  const ViewUsersLoaded = () => (
    <div>
      <Container className="mt-4">
        <h2>Explore</h2>
        <p>Every user has a story, and music is their voice. Browse, connect, and discover with <b>ECHO</b>.</p>
        <div className={styles.exploreContainer}>
          {users.map(user => <Album tracks={user.recent} user={user}/>)}
        </div>
      </Container>
    </div>
  )

  return (
    <Layout>
      <Container>
        {users ? <ViewUsersLoaded/> : <LoadingPage/>}
        {error ? <p>{error}</p> : null}
      </Container>
    </Layout>
  )
}
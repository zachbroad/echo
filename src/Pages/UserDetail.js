import {Card, Col, Container, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useAuth} from "../Components/Auth";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import {useLoaderData} from "react-router";
import UserDashboardView from "../Components/UserDashboardView";

export default function UserDetail() {
  const [userData, error] = useLoaderData();

  return (
    <div>
      <Header/>
      {userData &&
        <UserDashboardView data={userData} />
      }
      {error &&
        <Container>
          <Row>
            <Col>
              <h2>Error {error}</h2>

            </Col>
          </Row>
        </Container>
      }
    </div>
  )
}
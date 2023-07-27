import './UserDashboard.scss'
import Header from "../Components/Header";
import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import TrackGrid from "../Components/TrackGrid";
import UserCreatedDisplay from "../Components/UserCreatedDisplay";

export default function UserDashboard() {
    return (
        <div>
            <Header/>
            <Container className={"mt-5"}>
                <Row>
                    <Col sm="12" md={"8"}>
                        <h1>@zachbroad's dashboard</h1>
                        <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto debitis deserunt
                            doloribus
                            est fuga incidunt quos sint tempore! Accusantium asperiores autem dolores esse et fuga
                            minima
                            nisi praesentium quos sit!
                        </small>
                    </Col>
                    <Col sm="12" md={"4"}>
                        <Card>
                            <Card.Header>
                                <Card.Title>At a glance</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <span>
                                    <b>Favorite artist:</b> DAN-JPEG
                                </span>
                                <br/>
                                <span>
                                    <b>Songs liked:</b> 1805
                                </span>
                                <br/>
                                <span>
                                    <b>Top genre:</b> Electronic
                                </span>
                                <br/>
                                <span>
                                    <b>Recent mood:</b> Happy 😊
                                </span>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className={"mt-3 "}>
                    <Col>
                        <h1>Recently listening to...</h1>
                        <UserCreatedDisplay/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Top </h3>
                    </Col>
                    <Col>

                    </Col>
                    <Col>

                    </Col>
                </Row>

            </Container>
        </div>
    )
}
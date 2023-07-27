import './UserDashboard.scss'
import Header from "../Components/Header";
import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import UserCreatedDisplay from "../Components/UserCreatedDisplay";
import {useAuth} from '../Components/Auth';

export default function UserDashboard() {
    const {token, isLoggedIn, logout, profile} = useAuth();

    const ViewWhenLoggedIn = () => (
        <div>
            <Container className={"mt-4"}>
                <Row>
                    <Col sm="12" md={"8"}>
                        <div className="d-flex align-items-center mb-3">
                            <img className="rounded-circle me-2" src={profile.images[0].url}/>
                            <h2 className="ml-3">@{profile.display_name}'s dashboard</h2>
                        </div>
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
    );

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
        <div>
            <Header/>
            {!isLoggedIn ? <ViewWhenUnauth/> : <ViewWhenLoggedIn/>}
        </div>
    )
}
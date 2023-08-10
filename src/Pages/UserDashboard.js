import './UserDashboard.scss'
import Header from "../Components/Header";
import React, {useEffect, useState} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import TrackDisplayWithGridAndList from "../Components/TrackDisplayWithGridAndList";
import {useAuth} from '../Components/Auth';
import {API_RECENTLYSAVED, API_TOP} from "../api";
import TrackGrid from "../Components/TrackGrid";
import TrackSongList from "../Components/TrackSongList";

export default function UserDashboard() {
    const {token, isLoggedIn, logout, profile} = useAuth();

    /* TOP TRACKS */
    const [topTracks, setTopTracks] = useState(null);
    useEffect(() => {
        const getTracks = async () => {
            const response = await fetch(API_TOP, {
                headers: {
                    "Authorization": "Token " + token,
                }
            });
            const data = await response.json();
            setTopTracks(data.items);
        }

        getTracks();
    }, [])

    /* RECENT TRACKS */
    const [recentTracks, setRecentRecentTracks] = useState(null);
    useEffect(() => {
        const getRecentTracks = async () => {
            const response = await fetch(API_RECENTLYSAVED, {
                headers: {
                    "Authorization": "Token " + token,
                }
            });
            const data = await response.json();
            setRecentRecentTracks(data.tracks.items);
        }

        getRecentTracks();
    }, [])

    const ViewWhenLoggedIn = () => (
        <div>
            <Container className={"mt-4"}>
                <Row>
                    <Col sm="12" md={"8"}>
                        <div className="d-flex align-items-center mb-3">
                            <img className="rounded-circle me-2" src={profile.images[0].url}/>
                            <div>
                                <h2 className="ml-3 d-inline-flex align-content-center">@{profile.display_name}'s dashboard</h2>
                                <br/>
                                <small>{profile.followers.total} followers</small>
                            </div>
                        </div>
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

                <Row>
                    <Col sm={12}>
                        <h2>All Time Top Tracks</h2>
                        <TrackDisplayWithGridAndList data={topTracks}/>
                    </Col>
                </Row>

                <Row className={"mt-3 "}>
                    <Col>
                        <h2>Recently listening to...</h2>
                        <TrackDisplayWithGridAndList data={recentTracks}/>
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
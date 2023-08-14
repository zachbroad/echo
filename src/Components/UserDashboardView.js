import {Card, Col, Container, Row} from "react-bootstrap";
import TrackDisplayGrid from "./TrackDisplayGrid";
import TrackDisplayWithGridAndList from "./TrackDisplayWithGridAndList";
import React from "react";


const UserDashboardView = ({data}) => {
  const topLongTracks = data.tracks_long.items;
  const topMedTracks = data.tracks_med.items;
  const topShortTracks = data.tracks_short.items;

  const topArtistsLong = data.artists_long.items;
  const topArtistsMed = data.artists_med.items;
  const topArtistsShort = data.artists_short.items;

  const recentTracks = data.recents.items;
  const profile = data.profile;

  return (
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
                <Card.Title>Top 5 Artists</Card.Title>
              </Card.Header>
              <Card.Body>
                <ol>
                  {
                    topArtistsLong.slice(0, 5).map(artist => (
                      <li>{artist.name}</li>
                    ))
                  }
                </ol>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <hr/>

        <Row>
          <Col sm={12} md={4}>
            <h2>All Time Top Tracks</h2>
            <TrackDisplayGrid data={topLongTracks} limit={16}/>
          </Col>
          <Col sm={12} md={4}>
            <h2>Past year favorites</h2>
            <TrackDisplayGrid data={topMedTracks} limit={16}/>
          </Col>
          <Col sm={12} md={4}>
            <h2>Past month favorites</h2>
            <TrackDisplayGrid data={topShortTracks} limit={16}/>
          </Col>
        </Row>

        <Row className={"mt-3 "}>
          <Col>
            <h2>Recently listening to...</h2>
            <TrackDisplayWithGridAndList data={recentTracks}/>
          </Col>
        </Row>
        {/*<Row>*/}
        {/*  <Col>*/}
        {/*    <h3>Top </h3>*/}
        {/*  </Col>*/}
        {/*  <Col>*/}

        {/*  </Col>*/}
        {/*  <Col>*/}

        {/*  </Col>*/}
        {/*</Row>*/}

      </Container>
    </div>
  );
};


export default UserDashboardView;
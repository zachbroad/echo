import {Badge, Card, Col, Container, Row, Stack} from "react-bootstrap";
import TrackDisplayGrid from "./TrackDisplayGrid";
import TrackDisplayWithGridAndList from "./TrackDisplayWithGridAndList";
import React from "react";
import TopArtistsDisplay from "./TopArtistsDisplay";
import Magazine from "./Magazine";


function UserDashboardInfoSection({profile}) {
  return (
    <div className="d-flex align-items-center mb-3">
      <img className="rounded-circle me-2" src={profile.images[0].url}/>
      <div>
        <h2 className="ml-3 d-inline-flex align-content-center">@{profile.display_name}'s dashboard</h2>
        <br/>
        <small>{profile.followers.total} followers</small>
      </div>
    </div>
  )
}

function TopGenreRenderer({genres}) {
  return (
    <Col>
      <Stack direction={"horizontal"} className={"flex-wrap"} gap={2}>
        {[...genres].map((genre, i) => (
          <Badge pill bg={i % 2 === 0 ? "dark" : "secondary"}>
            {genre}
          </Badge>
        ))}
      </Stack>
    </Col>
  )
}

// Takes top artists, returns all their genres uniquely
function TopGenreHandler({artists}) {
  // get genres
  const genres = new Set();
  artists.forEach(artist => {
    artist.genres.forEach(genre => {
      genres.add(genre);
    });
  });

  // render them

  return <TopGenreRenderer genres={genres}/>;
}


const UserDashboardView = ({data}) => {
  const topLongTracks = data.tracks_long.items;
  const topMedTracks = data.tracks_med.items;
  const topShortTracks = data.tracks_short.items;

  const topArtistsLong = data.artists_long.items;
  const topArtistsMed = data.artists_med.items;
  const topArtistsShort = data.artists_short.items;

  const recentTracks = data.recents.items;
  const profile = data.profile;
  const magazine = data.magazine;
  console.dir(magazine)

  return (
    <div>
      <Container className={"mt-4"}>
        <Row style={{marginBottom: "5rem"}}>
          <Col sm="12" md={"8"}>
            <UserDashboardInfoSection profile={profile}/>
            <Magazine magazineData={magazine.trim().split('\r\n')}/>
          </Col>
          <Col sm="12" md={"4"}>
            <TopArtistsDisplay artists={topArtistsLong}/>
            <TopGenreHandler artists={topArtistsLong}/>
          </Col>
        </Row>
      </Container>


      <Container fluid>
        <Row noGutters={true} gutters={false} style={{marginBottom: "5rem"}}>
          <Col>
            <h4>Recently listening to...</h4>
            <TrackDisplayWithGridAndList data={recentTracks}/>
          </Col>
        </Row>

        <Row style={{marginBottom: "10rem"}}>
          <Col sm={12} md={4}>
            <h4>All Time Favorites</h4>
            <TrackDisplayGrid data={topLongTracks} limit={16}/>
          </Col>
          <Col sm={12} md={4}>
            <h4>Past Year Favorites</h4>
            <TrackDisplayGrid data={topMedTracks} limit={16}/>
          </Col>
          <Col sm={12} md={4}>
            <h4>Past Month Favorites</h4>
            <TrackDisplayGrid data={topShortTracks} limit={16}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};


export default UserDashboardView;
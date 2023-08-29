import React from "react";

import {Badge, Col, Container, Row, Stack} from "react-bootstrap";

import TrackDisplayWithGridAndList from "../TrackDisplay/TrackDisplayWithGridAndList";
import TrackDisplayGrid from "../TrackDisplay/TrackDisplayGrid";


function UserDashboardInfoSection({profile}) {
  return (
    <div className="d-flex align-items-center mb-3">
      <img alt={`${profile.display_name} on Echo`} className="d-inline rounded-circle me-2"
           src={profile.images[0].url}/>
      <div className="d-flex flex-column">
        <h5 className="p-0 m-0 mr-auto align-content-center">@{profile.display_name}</h5>
        <p className="p-0 m-0">{profile.followers.total} followers</p>
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
  artists.slice(0, 5).forEach(artist => {
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
      <Container className={"mt-3"}>
        <Row style={{marginBottom: "1rem"}}>
          <Col sm="12" md={"8"}>
            <UserDashboardInfoSection profile={profile}/>
            {/*<Magazine magazineData={magazine.trim().split(/\\n|\\n\\n|\n/)}/>*/}
          </Col>
          <Col sm="12" md={"4"}>
            {/*<TopArtistsDisplay className={"mb-4"} artists={topArtistsMed}/>*/}
            {/*<TopGenreHandler artists={topArtistsLong}/>*/}
          </Col>
        </Row>
      </Container>

      <h4 className="py-2 px-3">Recently listening to...</h4>
      <TrackDisplayWithGridAndList data={recentTracks}/>

      <Container>
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
  )
    ;
};


export default UserDashboardView;
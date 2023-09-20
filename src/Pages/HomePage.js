import React, {createContext, useContext, useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {API_DASHBOARD, API_ME, redirectAndAuthWithSpotify} from "../api";
import {useAuth} from "../Components/Auth/Auth";
import Layout from "../Components/Layout/Layout";
import trackgridstyles from "../Components/TrackGrid/trackgrid.module.scss";
import styles from './homepage.module.scss';
import AlbumArtworkNode from "../Components/AlbumArtworkNode/AlbumArtworkNode";

function HomePageConnectSpotify() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 pb-5">
      <Col className="align-items-center text-center" style={{padding: 0}}>
        <h1>ECHO</h1>
        <h3>YOUR SPOTIFY — VISUALIZED</h3>
        <Button
          onClick={() => redirectAndAuthWithSpotify()}
          className="me-2"
          variant="success"
        >
          Connect your Spotify
        </Button>
      </Col>
    </div>
  )
}


const SpotifyContext = createContext();

const useSpotifyRecents = () => {
  return useContext(SpotifyContext);
}

const SpotifyProvider = ({children}) => {
  const {token} = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dResponse = await fetch(API_DASHBOARD, {
        headers: {
          "Authorization": `Token ${token}`
        }
      });
      const d = await dResponse.json();
      setData(d);
    }

    fetchData();
  }, []);


  return (
    <SpotifyContext.Provider value={{data}}>
      {children}
    </SpotifyContext.Provider>
  )
}


function HomePageLoggedIn() {
  const {token, isLoggedIn, logout, profile} = useAuth();
  const {data} = useSpotifyRecents();
  const limit = 49;
  return (
    <>
      <div className={styles.homepageContainer}>
        <div className={styles.hero}>
          <h1>ECHO</h1>
          <h3>YOUR SPOTIFY — VISUALIZED</h3>
          <p>Welcome back, @{profile.display_name}.</p>
          <Button as={Link} to={"/dashboard/"} className="me-2" variant="dark">Your Dashboard</Button>
          <Button as={Link} to={"/explore/"} className="me-2" variant="dark">Explore</Button>
        </div>

        <div
          className={`${trackgridstyles.trackGrid} ${trackgridstyles.hp} ${trackgridstyles.trackGridHome}`}>
          {data?.recents.items.slice(0, limit).map((track, index) => (
            <AlbumArtworkNode key={index} track={track.track || track}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default function HomePage() {
  const {token, isLoggedIn, logout, profile} = useAuth();

  return (
    <Layout>
      {isLoggedIn ?
        (
          <SpotifyProvider>
            <HomePageLoggedIn/>
          </SpotifyProvider>
        ) :
        <HomePageConnectSpotify/>
      }
    </Layout>
  )
}
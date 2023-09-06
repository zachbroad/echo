import React from 'react';
import Layout from "../Components/Layout/Layout";
import {Audio, Bars, Circles, Dna, MagnifyingGlass} from "react-loader-spinner";

import styles from './userdashboardloading.module.scss';
import {useEffect, useState} from "react";
function SlideScanningSpotify() {
  return (
    <div className={styles.slide}>
      <h2><span role="img" aria-label="magnifying-glass">🔍</span> SCANNING YOUR SPOTIFY... <span role="img" aria-label="music">🎶</span></h2>      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor='#c0efff'
        color='#e15b64'
      />
      <p>Sifting through your listening history to capture your musical essence.</p>
    </div>
  )
}

function SlideConnectingCommunity() {
  return (
    <div className={styles.slide}>
      <h2><span role="img" aria-label="globe">🌍</span> CONNECTING COMMUNITY... <span role="img" aria-label="people">👥</span></h2>      <Circles
        height="80"
        width="80"
        color="orange"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p>Bringing together music enthusiasts from around the globe.</p>
    </div>
  )
}

function SlideLoadingProfile() {
  return (
    <div className={styles.slide}>
      <h2><span role="img" aria-label="arrows">🔄</span> LOADING PROFILE... <span role="img" aria-label="user">👤</span></h2>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      <p>Retrieving your musical snapshot and recent listens.</p>
    </div>
  )
}

function SlideGatheringTracks() {
  return (
    <div className={styles.slide}>
      <h2><span role="img" aria-label="music-notes">🎼</span> GATHERING TRACKS... <span role="img" aria-label="playlist">📋</span></h2>
      <Bars
        height="80"
        width="80"
        color="lightskyblue"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p>Compiling all your favorite tunes from Spotify to create your unique profile.</p>
    </div>
  )
}

function SlideAnalyzingVibes() {
  return (
    <div className={styles.slide}>
      <h2><span role="img" aria-label="headphones">🎧</span> ANALYZING VIBES... <span role="img" aria-label="heart">❤️</span></h2>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      <p>Understanding the beats, rhythms, and genres that resonate with you.</p>
    </div>
  )
}


const slides = [
  <SlideScanningSpotify/>,
  <SlideGatheringTracks/>,
  <SlideAnalyzingVibes/>,
  <SlideConnectingCommunity/>,
  <SlideLoadingProfile/>,
];

export default function UserDashboardLoadingPage() {
  const [slide, setSlide] = useState(0);
  const [fadeEffect, setFadeEffect] = useState('fadeIn');

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setFadeEffect('fadeOut');
    }, 2500);

    const slideTimer = setTimeout(() => {
      setSlide((prevSlide) => (prevSlide + 1) % slides.length);
      setFadeEffect('fadeIn');
    }, 3500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(slideTimer);
    };
  }, [slide]);

  return (
    <Layout className={styles.loadingContainer}>
      <div className={styles.center}>
        <div className={`${styles.slide} ${styles[fadeEffect]}`}>
          {slides[slide]}
        </div>
      </div>
    </Layout>
  );
}

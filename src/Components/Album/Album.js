import {Link} from "react-router-dom";
import TrackGrid from "../TrackGrid/TrackGrid";
import React, {useState} from "react";

import styles from "./album.module.scss";
import {getAlbumArtworkUrl, getAllArtists} from "../../util";
import {usePlayer} from "../Player/Player";

const TrackInline = ({track}) => {
  const {song, isPlaying, onPlay, onPause, setPlayerSong, audioRef} = usePlayer();

  return (
    <div className={styles.trackInline} onClick={() => setPlayerSong(track)}>
      <img src={getAlbumArtworkUrl(track)} alt=""/>
      <div>
        <b>
          {track.name}
        </b>
        <p>
          {getAllArtists(track.artists)}
        </p>
      </div>
    </div>
  );
};

export function Album({tracks, user}) {
  const [isFront, setIsFront] = useState(true); // <-- Add this line for state
  if (tracks == null) {
    return null;
  }

  const Back = () => (
    <div className={styles.back}>
      {tracks.items.slice(0, 16).map((track) => (
        <TrackInline track={track.track}/>
      ))}
    </div>
  );

  const Front = () => (
    <div className={styles.front}>
      <TrackGrid limit={16} tracks={tracks.items.slice(0, 16)}/>
    </div>
  );

  const FlipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-repeat"
         viewBox="0 0 16 16">
      <path
        d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
      <path fillRule="evenodd"
            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
    </svg>
  )

  const flipCard = () => {
    setIsFront(!isFront);
  };

  const ExploreItemHeader = () => (
    <div className={styles.exploreItemHeader}>
      <Link to={`/explore/${user.username}/`}>{user.username}</Link>
      {/*<span onClick={flipCard}>*/}
      {/*<FlipIcon/>*/}
      {/*</span>*/}
    </div>
  );


  return (
    <div key={user.username} className={styles.albumContainer}>
      <ExploreItemHeader/>
      <Front/>
      {/*<div className={`${styles.cardContent} ${!isFront ? styles.showBack : styles.showFront}`}>*/}
      {/*  <Back/>*/}
      {/*</div>*/}
    </div>
  );
}

export default Album;
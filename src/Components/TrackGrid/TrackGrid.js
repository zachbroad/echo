import React from "react";
import AlbumArtworkNode from "../AlbumArtworkNode/AlbumArtworkNode";
import styles from './trackgrid.module.scss';


export default function TrackGrid({ tracks, limit = 49 }) {
  return (
    <div>
      {tracks ? (
        <div className={styles.trackGrid + ` ${limit <= 16 ? styles.smaller : ''}`}>
          {tracks.slice(0, limit).map((track, index) => (
            <AlbumArtworkNode key={index} track={track.track || track} />
          ))}
        </div>
      ) : (
        <p>Loading tracks...</p>
      )}
    </div>
  );
}

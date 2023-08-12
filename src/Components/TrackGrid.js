import React, {useEffect, useState} from "react";
import AlbumArtworkNode from "./AlbumArtworkNode";
import './TrackGrid.scss';


export default function TrackGrid({ tracks, limit = 49 }) {
  return (
    <div>
      {tracks ? (
        <div className={`track-grid ${limit <= 16 ? ' smaller' : ''}`} style={{}}>
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

import React from 'react';
import AlbumArtworkNode from "./AlbumArtworkNode";


export default function TrackSongList({tracks}) {
  return (
    <div style={{overflowY: "scroll", height: "300px"}}>
      <ol>

        {
          tracks.map(data => {
            if (data.track != null) {
              return (
                <li>{data.track.name}</li>
              );
            } else {
              return (
                <li>{data.name}</li>
              );
            }
          })
        }
      </ol>
    </div>
  )
}
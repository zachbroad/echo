import React from 'react';
import AlbumArtworkNode from "./AlbumArtworkNode";


export default function TrackSongList({tracks}) {
  function getAllArtists(artists) {
    var artistNames = artists.map(artist => artist.name);
    return artistNames.join(", ");
  }

  return (
    <div style={{overflowY: "scroll", maxHeight: "845px"}}>
      <ol>

        {
          tracks.map(data => {
            if (data.track != null) {
              return (
                <li>
                  <b>
                    {data.track.name}
                  </b>
                  <br/>
                  by {getAllArtists(data.track.artists)}

                </li>
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
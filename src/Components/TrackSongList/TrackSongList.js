import React from 'react';
import {getAllArtists} from "../../util";


function TrackSongList({tracks}) {
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
  );
}

export default TrackSongList;
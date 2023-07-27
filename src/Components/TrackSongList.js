import React from 'react';


export default function TrackSongList({tracks}) {
    return (
        <div>
            {
                tracks.map(data => {
                    console.dir(data)
                    return (
                        <p>{data.track.name}</p>
                    )
                })
            }
        </div>
    )
}
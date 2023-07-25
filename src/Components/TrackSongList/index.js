import React from 'react';


export default function TrackSongList({tracks}) {
    return (
        tracks.map(track => {
            return (
                <p>{track.name}</p>
            )
        })
    )
}
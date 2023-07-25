import React, {useEffect, useState} from "react";
import {spotifyApi} from "../../api";
import AlbumArtworkNode from "../AlbumArtworkNode";


export default function TrackGrid({tracks}) {
    return (
        <div>
            {tracks ? (
                <div style={{display: "grid", gridTemplateColumns: "repeat(6, 125px)"}}>
                    {tracks.map((track, index) => (
                        <AlbumArtworkNode track={track.track}/>
                    ))}
                </div>
            ) : (
                <p>Loading tracks...</p>
            )}
        </div>

    )
}
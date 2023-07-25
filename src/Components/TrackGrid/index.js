import React, {useEffect, useState} from "react";
import {spotifyApi} from "../../api";
import AlbumArtworkNode from "../AlbumArtworkNode";

export function TrackGrid() {
    const [tracks, setTracks] = useState();

    useEffect(() => {
        if (localStorage.getItem("access_token") === "null") return;
        console.dir(localStorage.getItem("access_token"))
        console.dir('hi')

        spotifyApi.setAccessToken(localStorage.getItem("access_token"))
        var t = spotifyApi.getMySavedTracks(
            {limit: 36,}
        ).then((d) => {
            setTracks(d.items);
            console.dir(d.items)
        })
    }, [])

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
import TrackGrid from "../Components/TrackGrid";
import TrackSongList from "../Components/TrackSongList";
import {useEffect, useState} from "react";
import {spotifyApi} from "../api";
import React from 'react';


export default function UserCreatedDisplay({data}) {
    const [tracks, setTracks] = useState();

    useEffect(() => {
        if (localStorage.getItem("access_token") === "null") return;
        spotifyApi.setAccessToken(localStorage.getItem("access_token"))

        var t = spotifyApi.getMySavedTracks(
            {limit: 36,}
        ).then((d) => {
            setTracks(d.items);
            console.dir(d.items)
        })
    }, [])

    return (
        <>
            {
                tracks ? (
                    <div>
                        <TrackGrid tracks={tracks}/>
                        {/*<TrackSongList tracks={tracks}/>*/}
                    </div>
                ) : (
                    <div>loading tracks</div>
                )
            }
        </>
    )
}
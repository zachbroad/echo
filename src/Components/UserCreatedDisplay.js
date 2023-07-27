import TrackGrid from "../Components/TrackGrid";
import TrackSongList from "../Components/TrackSongList";
import {useEffect, useState} from "react";
import {spotifyApi} from "../api";
import React from 'react';
import {Col, Row} from "react-bootstrap";


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
                        <Row>
                            <Col sm={12} md={8}>
                                <TrackGrid tracks={tracks}/>
                            </Col>
                            <Col sm={12} md={4}>
                                <TrackSongList tracks={tracks}/>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    <div>loading tracks</div>
                )
            }
        </>
    )
}
import TrackGrid from "../Components/TrackGrid";
import TrackSongList from "../Components/TrackSongList";
import {useEffect, useState} from "react";
import React from 'react';
import {Col, Row} from "react-bootstrap";
import {useAuth} from "./Auth";
import {API_TOP} from "../api";


export default function UserCreatedDisplay({data}) {
    const [tracks, setTracks] = useState();
    const {token} = useAuth();

    useEffect(() => {
        const getTracks = async () => {
            const response = await fetch(API_TOP, {
                headers: {
                    "Authorization": "Token " + token,
                }
            });
            const data = await response.json();
            console.dir(data);
            setTracks(data.items);
        }

        getTracks();
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
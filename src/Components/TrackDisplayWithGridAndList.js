import TrackGrid from "../Components/TrackGrid";
import TrackSongList from "../Components/TrackSongList";
import {useEffect, useState} from "react";
import React from 'react';
import {Col, Row} from "react-bootstrap";
import {useAuth} from "./Auth";
import {API_RECENTLYSAVED} from "../api";


export default function TrackDisplayWithGridAndList({data}) {
    return (
        <>
            {
                data ? (
                    <div>
                        <Row>
                            <Col sm={12} md={8}>
                                <TrackGrid tracks={data}/>
                            </Col>
                            <Col sm={12} md={4}>
                                <TrackSongList tracks={data}/>
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
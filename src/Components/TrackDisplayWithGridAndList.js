import TrackGrid from "../Components/TrackGrid";
import TrackSongList from "../Components/TrackSongList";
import React from 'react';
import {Col, Row} from "react-bootstrap";
import './TrackDisplayWithGridAndList.scss';


export default function TrackDisplayWithGridAndList({data}) {
    return (
        <>
            {
                data ? (
                    <div className="track-display-container shadow-sm">
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
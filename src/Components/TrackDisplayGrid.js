import TrackGrid from "../Components/TrackGrid";
import React from 'react';
import {Col, Row} from "react-bootstrap";
import './TrackDisplay.scss';


export default function TrackDisplayGrid({data, limit=49}) {
  return (
    <>
      {
        data ? (
          <div className="track-display-container shadow-sm">
            <TrackGrid tracks={data} limit={limit}/>
          </div>
        ) : (
          <div>loading tracks</div>
        )
      }
    </>
  )
}

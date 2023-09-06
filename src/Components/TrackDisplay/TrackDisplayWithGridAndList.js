import React from 'react';

import TrackGrid from "../TrackGrid/TrackGrid";
import Loading from "../Loading/Loading";

import styles from './trackdisplay.module.scss';


function TrackDisplayWithGridAndList({data, limit=20}) {
  return (
    <>
      {
        data ? (
          <div className={styles.trackDisplayContainer}>
            <TrackGrid tracks={data} limit={limit}/>
          </div>
        ) : (
          <Loading />
        )
      }
    </>
  );
}

export default TrackDisplayWithGridAndList;
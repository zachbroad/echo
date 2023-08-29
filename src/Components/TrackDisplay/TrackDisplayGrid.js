import React from 'react';
import TrackGrid from "../TrackGrid/TrackGrid";
import styles from './trackdisplay.module.scss';


export default function TrackDisplayGrid({data, limit=49}) {
  return (
    <>
      {
        data ? (
          <div className={styles.trackDisplayContainer}>
            <TrackGrid tracks={data} limit={limit}/>
          </div>
        ) : (
          <div>loading tracks</div>
        )
      }
    </>
  )
}

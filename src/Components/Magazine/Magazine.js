import {Carousel} from "react-bootstrap";
import he from 'he';
import styles from './magazine.module.scss';
import React from "react";

function Magazine({magazineData}) {
  return (
    <div className={styles.magazineContainer}>
      {magazineData.filter((i) => i != "").map(line =>
        <p dangerouslySetInnerHTML={{__html: he.decode(line)}}></p>
      )}
    </div>
  );
}

export default Magazine;
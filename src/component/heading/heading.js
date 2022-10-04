import React from 'react';
import Carousel from '../carousel/carousel';
import styles from './heading.module.css';

const Heading = ({ workService }) => {
  return (
    <div className={styles.heading}>
      <h1 className={styles.title}>Talk & Talk</h1>
      <p className={styles.description}>
        Upload your Procrate works. <br /> Then, enjoy communicating with others
      </p>
      <div>
        <Carousel workService={workService} />
      </div>
    </div>
  );
};

export default Heading;

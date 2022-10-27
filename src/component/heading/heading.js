import React from 'react';
import Carousel from '../carousel/carousel';
import styles from './heading.module.css';

const Heading = ({ workService }) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Talk & Talk</h1>
        <h3 className={styles.description}>
          Upload your artistics paintings. <br />
          Then, enjoy talking with others.
        </h3>
        <div>
          <Carousel workService={workService} />
        </div>
      </div>
    </div>
  );
};

export default Heading;

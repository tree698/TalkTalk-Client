import React from 'react';
import styles from './heading.module.css';

const Heading = (props) => {
  return (
    <div className={styles.heading}>
      <h1 className={styles.title}>Talk & Talk</h1>
      <p className={styles.description}>
        Upload your works. <br /> Then, enjoy communicating with oters
      </p>
    </div>
  );
};

export default Heading;

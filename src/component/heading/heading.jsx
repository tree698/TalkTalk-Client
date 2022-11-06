import React from 'react';
import Footer from '../footer/footer';
import ImageSlide from '../imageSlide/imageSlide';
import styles from './heading.module.css';

const Heading = ({ workService }) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.intro}>
          <div className={styles.logo__wrap}>
            <img src="logo.png" className={styles.logo} alt="logo" />
          </div>
          <div className={styles.title__description}>
            <h1 className={styles.title}>TalkTalk</h1>
            <h3 className={styles.description}>Enjoy talking with others.</h3>
          </div>
        </div>

        <div className={styles.carousel}>
          <ImageSlide workService={workService} />
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Heading;

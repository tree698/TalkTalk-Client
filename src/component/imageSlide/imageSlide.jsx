import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import styles from './imageSlide.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

const ImageSlide = ({ workService }) => {
  const pagination = {
    limit: 4,
    offset: 0,
  };
  const baseURL = process.env.REACT_APP_BASE_URL;

  const [works, setWorks] = useState([]);

  useEffect(() => {
    workService.showWorks(pagination.limit, pagination.offset).then(setWorks);
  }, [workService]);

  return (
    <>
      <p>Recently, added paintings</p>
      <Carousel
        className={styles.carousel}
        autoPlay={true}
        infiniteLoop={true}
        interval="2500"
      >
        {works.map((work) => (
          <div key={work.id} className={styles.image__container}>
            <img
              className={styles.image}
              src={`${baseURL}/uploaded_images/${work.fileName}`}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
};
export default ImageSlide;

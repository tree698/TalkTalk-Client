import React from 'react';
import styles from './imageSlide.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

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
      <h2>Recently, uploaded paintings</h2>
      <Carousel className={styles.carousel}>
        {works.map((work) => (
          <div key={work.id}>
            <div className={styles.image__container}>
              <img
                className={styles.image}
                src={`${baseURL}/uploaded_images/${work.fileName}`}
              />
            </div>
            <h3>By {work.username}</h3>
          </div>
        ))}
      </Carousel>
    </>
  );
};
export default ImageSlide;

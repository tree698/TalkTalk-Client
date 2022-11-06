import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
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
    <Carousel>
      {works.map((work) => (
        <div>
          <img
            style={{ width: '30%' }}
            src={`${baseURL}/uploaded_images/${work.fileName}`}
          />
        </div>
      ))}
    </Carousel>
  );
};
export default ImageSlide;

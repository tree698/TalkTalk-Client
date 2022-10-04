import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import DisplayCarsol from '../display_Carousel/displayCarsol';
import styles from './carousel.module.css';

const Carousel = ({ workService }) => {
  const pagination = {
    limit: 4,
    offset: 0,
  };

  const [works, setWorks] = useState([]);

  useEffect(() => {
    workService.showWorks(pagination.limit, pagination.offset).then(setWorks);
  }, [workService]);

  return (
    <div>
      <p>Recently, uploaded works</p>
      {works.map((work) => (
        <DisplayCarsol key={work.id} work={work} />
      ))}
    </div>
  );
};

export default Carousel;

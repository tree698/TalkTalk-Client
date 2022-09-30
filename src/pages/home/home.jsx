import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Works from '../../component/works/works';
import styles from './home.module.css';

const Home = ({ workService }) => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    workService.getWorks().then(setWorks);
  }, [workService]);

  return (
    <div>
      <h1>Home Page</h1>
      {works.map((work) => (
        <Works key={work.id} work={work} />
      ))}
    </div>
  );
};

export default Home;

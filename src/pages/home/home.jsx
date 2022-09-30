import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AllWorks from '../../component/allWorks/allWorks';
import styles from './home.module.css';

const Home = ({ workService, onClickWork }) => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    workService.getWorks().then(setWorks);
  }, [workService]);

  return (
    <div>
      <h1>Home Page</h1>
      {works.map((work) => (
        <AllWorks key={work.id} work={work} onClickWork={onClickWork} />
      ))}
      <button>View More</button>
    </div>
  );
};

export default Home;

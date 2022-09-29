import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './home.module.css';

const Home = ({ workService }) => {
  const [work, setWork] = useState([]);

  useEffect(() => {
    workService.getWorks().then((data) => console.log(data[0].title));
  }, [workService]);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;

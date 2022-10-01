import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AllWorks from '../../component/allWorks/allWorks';
import Header from '../../component/header/header';
import styles from './home.module.css';

const Home = ({ workService, onClickWork }) => {
  const pagination = {
    limit: 8,
    offset: 0,
  };

  const [works, setWorks] = useState([]);
  const [limit, setLimit] = useState(pagination.limit);
  const [offset, setOffset] = useState(pagination.offset);
  const [lengthWork, setLengthWork] = useState(pagination.limit);

  useEffect(() => {
    workService.getWorks(limit, offset).then(setWorks);
    updateOffset();
  }, [workService]);

  const clickHandler = () => {
    updateOffset();
    workService.getWorks(limit, offset).then((data) => {
      setLengthWork(data.length);
      setWorks([...works, ...data]);
    });
  };

  const updateOffset = () => {
    const updateOffset = limit + offset;
    setOffset(updateOffset);
  };

  return (
    <div>
      <Header addUpload={true} />
      <h1>Home Page</h1>
      {works.map((work) => (
        <AllWorks key={work.id} work={work} onClickWork={onClickWork} />
      ))}
      {lengthWork >= limit && <button onClick={clickHandler}>View More</button>}
    </div>
  );
};

export default Home;

import React from 'react';
import { useEffect, useState } from 'react';
import Banner from '../banner/banner';
import DisplayWork from '../displayWorks/displayWork';
import SearchFeature from '../searchFeature/searchFeature';
import styles from './allWorks.module.css';

const AllWorks = ({ workService, onClickWork, onSendSearchTerm }) => {
  const pagination = {
    limit: 8,
    offset: 0,
  };

  const [works, setWorks] = useState([]);
  const [limit, setLimit] = useState(pagination.limit);
  const [offset, setOffset] = useState(pagination.offset);
  const [lengthWork, setLengthWork] = useState(pagination.limit);
  const [error, setError] = useState('');

  useEffect(() => {
    workService.getWorks(limit, offset).then(setWorks);
    updateOffset();
  }, [workService]);

  const clickHandler = () => {
    updateOffset();
    workService
      .getWorks(limit, offset)
      .then((work) => {
        setLengthWork(work.length);
        setWorks([...works, ...work]);
      })
      .catch((error) => setError(error.toString()));
  };

  const updateOffset = () => {
    const updateOffset = limit + offset;
    setOffset(updateOffset);
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <SearchFeature onSendSearchTerm={onSendSearchTerm} />
      </div>
      <Banner text={error} />
      <div className={styles.works}>
        {works.map((work) => (
          <DisplayWork key={work.id} work={work} onClickWork={onClickWork} />
        ))}
      </div>
      {lengthWork === limit && (
        <button onClick={clickHandler} className={styles.button}>
          View More
        </button>
      )}
    </div>
  );
};
export default AllWorks;

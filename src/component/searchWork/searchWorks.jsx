import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import DisplayWork from '../displayWorks/displayWork';
import styles from './searchWorks.module.css';

const SearchWork = ({ workService, onClickWork, searchTerm }) => {
  const pagination = {
    limit: 100,
    offset: 0,
  };

  const saveTerm = { term: '' };
  const [works, setWorks] = useState([]);
  const [limit, setLimit] = useState(pagination.limit);
  const [offset, setOffset] = useState(pagination.offset);
  const [lengthWork, setLengthWork] = useState(pagination.limit);

  useEffect(() => {
    searchTerm &&
      workService.searchWorks(limit, offset, searchTerm).then((work) => {
        setWorks(work);
      });
    saveTerm.term = searchTerm;
  }, [searchTerm]);

  const clickHandler = () => {
    updateOffset();
    workService.getWorks(limit, offset, saveTerm.term).then((work) => {
      setLengthWork(work.length);
      setWorks([...works, ...work]);
    });
  };

  const updateOffset = () => {
    const updateOffset = limit + offset;
    setOffset(updateOffset);
  };

  return (
    <div>
      {works.map((work) => (
        <DisplayWork key={work.id} work={work} onClickWork={onClickWork} />
      ))}
      {/* {lengthWork === limit && (
        <button onClick={clickHandler}>View More</button>
      )} */}
    </div>
  );
};
export default SearchWork;

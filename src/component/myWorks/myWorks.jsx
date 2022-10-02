import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import DisplayWork from '../displayWorks/displayWork';
import styles from './myWorks.module.css';

const MyWorks = ({ workService, onClickWork }) => {
  const pagination = {
    limit: 200,
    offset: 0,
  };

  const { user } = useAuth();

  const [works, setWorks] = useState([]);
  const [limit, setLimit] = useState(pagination.limit);
  const [offset, setOffset] = useState(pagination.offset);

  useEffect(() => {
    workService.getWorks(limit, offset, user.username).then(setWorks);
  }, [workService]);

  return (
    <div>
      {works.map((work) => (
        <DisplayWork key={work.id} work={work} onClickWork={onClickWork} />
      ))}
    </div>
  );
};

export default MyWorks;

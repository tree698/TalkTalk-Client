import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import DisplayWork from '../displayWorks/displayWork';
import styles from './myWorks.module.css';

const MyWorks = ({
  workService,
  onClickWork,
  addDeleteBtn,
  // sendToBeDeletedWork,
}) => {
  const pagination = {
    limit: 200,
    offset: 0,
  };

  const { user } = useAuth();
  const [works, setWorks] = useState([]);

  const [test, setText] = useState([]);

  useEffect(() => {
    workService
      .getWorks(pagination.limit, pagination.offset, user.username)
      .then(setWorks);
  }, [workService]);

  const sendToBeDeletedWork = (work) => {
    setText([...test, work]);
    test.forEach((w) => console.log(w));
  };

  return (
    <div>
      {works.map((work) => (
        <DisplayWork
          key={work.id}
          work={work}
          onClickWork={onClickWork}
          addDeleteBtn={addDeleteBtn}
          sendToBeDeletedWork={sendToBeDeletedWork}
        />
      ))}
    </div>
  );
};

export default MyWorks;

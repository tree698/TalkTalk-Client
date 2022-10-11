import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import DisplayWork from '../displayWorks/displayWork';
import styles from './myWorks.module.css';

const MyWorks = ({ workService, onClickWork, addDeleteBtn }) => {
  const pagination = {
    limit: 100,
    offset: 0,
  };

  const { user } = useAuth();
  const [works, setWorks] = useState([]);
  const [error, setError] = useState('');

  const [toBeDeletedWork, setToBeDeletedWork] = useState([]);

  useEffect(() => {
    workService
      .getWorks(pagination.limit, pagination.offset, user.username)
      .then(setWorks);
  }, [workService]);

  const onClickDeleteBtn = () => {
    const deleteWork = screendToBeDeletedWork(toBeDeletedWork);
    if (deleteWork.length === 0) {
      window.alert('Please, choose the works you want to delete!');
      return;
    }

    if (window.confirm('Do you really want to delete?')) {
      deleteWork.forEach((workId) =>
        workService
          .deleteWork(workId)
          .then(() =>
            setWorks((works) => works.filter((work) => work.id !== workId))
          )
          .catch((error) => setError(error.toString()))
      );
      setToBeDeletedWork([]);
    }
  };

  const onSendToBeDeletedWork = (workId) => {
    setToBeDeletedWork([...toBeDeletedWork, workId]);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <button onClick={onClickDeleteBtn}>Delete</button>
      {works.map((work) => (
        <DisplayWork
          key={work.id}
          work={work}
          onClickWork={onClickWork}
          addDeleteBtn={addDeleteBtn}
          onSendToBeDeletedWork={onSendToBeDeletedWork}
        />
      ))}
    </div>
  );
};

function screendToBeDeletedWork(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const count = array.filter((a) => a === array[i]).length;
    if (count % 2 !== 0) {
      result.push(array[i]);
    }
  }
  return [...new Set(result)];
}

export default MyWorks;

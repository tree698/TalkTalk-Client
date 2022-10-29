import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './displayWorks.module.css';

const DisplayWork = ({
  work,
  onClickWork,
  addDeleteBtn,
  onSendToBeDeletedWork,
}) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const { id } = work;
  const navigate = useNavigate();

  const onChange = (event) => {
    onSendToBeDeletedWork(id);
  };

  const onClickHandler = () => {
    navigate('/talk');
    onClickWork(work);
  };

  return (
    <div className={styles.container}>
      {addDeleteBtn && (
        <input
          className={styles.deleteBox}
          name="delete"
          id="delete"
          onChange={onChange}
          type="checkbox"
        />
      )}
      <button onClick={onClickHandler} className={styles.workBtn}>
        <div className={styles.painting__wrap}>
          <img
            src={`${baseURL}/uploaded_images/${work.fileName}`}
            alt="user painting"
            className={styles.painting}
          />
        </div>

        <div className={styles.metaInfo}>
          <p className={styles.info__title}>{work.title}</p>
          <p className={styles.info__username}>By {work.username}</p>
        </div>
      </button>
    </div>
  );
};

export default DisplayWork;

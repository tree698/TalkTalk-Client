import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './selectedWork.module.css';

const SelectedWork = ({ selectedWork }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedWork) {
      navigate('/');
    }
  });

  return (
    <>
      {selectedWork && (
        <div className={styles.work}>
          <img
            className={styles.img}
            src={`${baseURL}/uploaded_images/${selectedWork.fileName}`}
            alt="painting"
          />
          <div className={styles.divider__wrap}>
            <span className={styles.divider} />
          </div>
          <ul className={styles.metaInfo}>
            <li className={styles.info}>
              <span className={styles.subTitle}>Title</span>
              &ensp;
              {selectedWork.title}
            </li>
            <li className={styles.info}>
              <span className={styles.subTitle}>Username</span>
              &ensp;
              {selectedWork.username}
            </li>
            <li className={styles.info}>
              <span className={styles.subTitle}>Brush</span>
              &ensp;
              {selectedWork.brush}
            </li>
            <li className={styles.info}>
              <span className={styles.subTitle}>Say something</span>
              &ensp;
              {selectedWork.description}
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default SelectedWork;

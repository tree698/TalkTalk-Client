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
            alt=""
          />
          <p>{selectedWork.title}</p>
          <p>{selectedWork.username}</p>
          <p>{selectedWork.brush}</p>
          <p>{selectedWork.description}</p>
        </div>
      )}
    </>
  );
};

export default SelectedWork;

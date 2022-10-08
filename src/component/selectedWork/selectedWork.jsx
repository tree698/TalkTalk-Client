import React from 'react';
import styles from './selectedWork.module.css';

const SelectedWork = ({ selectedWork }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
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

import React from 'react';
import styles from './avatar.module.css';

const Avatar = ({ photo, username }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  return (
    <div className={styles.container}>
      {!!photo ? (
        <img
          className={styles.image}
          src={`${baseURL}/uploaded_images/${photo}`}
        />
      ) : (
        <div className={styles.noImage}>{username.charAt(0)}</div>
      )}
    </div>
  );
};

export default Avatar;

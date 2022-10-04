import React from 'react';
import styles from './displayCarousel.module.css';

const DisplayCarsol = ({ work }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  return (
    <img
      style={{ width: '30%' }}
      src={`${baseURL}/uploaded_images/${work.fileName}`}
    />
  );
};
export default DisplayCarsol;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Dropzone from 'react-dropzone';
import styles from './fileUpload.module.css';

const FileUpload = ({ workService, liftFile, photo }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const dropHandler = (file) => {
    workService.uploadImage(file).then(liftFile);
  };

  return (
    <div className={styles.container}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section className={styles.dropZone}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <button className={styles.message}>
                Drag & drop <br /> or <br />
                Click here
              </button>
            </div>
          </section>
        )}
      </Dropzone>

      <div className={styles.displayZone}>
        {photo ? (
          <img
            src={`${baseURL}/uploaded_images/${photo}`}
            className={styles.photo}
          />
        ) : (
          <FontAwesomeIcon icon={faPlus} className={styles.icon} />
        )}
      </div>
    </div>
  );
};

export default FileUpload;

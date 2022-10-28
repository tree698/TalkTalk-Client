import React from 'react';
import Dropzone from 'react-dropzone';
import styles from './fileUpload.module.css';

const FileUpload = ({ workService, liftFile }) => {
  const dropHandler = (file) => {
    workService.uploadImage(file).then(liftFile);
  };

  return (
    <Dropzone onDrop={dropHandler}>
      {({ getRootProps, getInputProps }) => (
        <section className={styles.container}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <button className={styles.message}>
              Drag & Drop Here <br /> or Click Here
            </button>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default FileUpload;

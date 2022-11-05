import React from 'react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import styles from './fileUpload.module.css';

const FileUpload = ({ workService, liftFile }) => {
  const [loading, setLoading] = useState(false);

  const dropHandler = async (file) => {
    setLoading(true);
    const result = await workService.uploadImage(file);
    setLoading(false);

    liftFile(result);
  };

  return (
    <>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section className={styles.dropZone}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <button className={styles.message}>
                Drag & Drop Here <br /> or Click Here
              </button>
            </div>
          </section>
        )}
      </Dropzone>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.loading__animation}>Loading ...</div>
        </div>
      )}
    </>
  );
};

export default FileUpload;

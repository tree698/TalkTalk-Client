import React from 'react';
import Dropzone from 'react-dropzone';
import styles from './fileUpload.module.css';

const FileUpload = ({ workService, liftFile }) => {
  const dropHandler = (file) => {
    workService.uploadImage(file).then(liftFile);
  };

  return (
    <div>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default FileUpload;

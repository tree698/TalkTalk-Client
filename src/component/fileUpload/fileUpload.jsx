import React from 'react';
import Dropzone from 'react-dropzone';
import styles from './fileUpload.module.css';

const FileUpload = ({ workService }) => {
  const dropHandler = (file) => {
    workService.uploadImage(file).then(console.log);
  };

  return (
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
  );
};

export default FileUpload;

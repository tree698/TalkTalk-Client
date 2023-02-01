import Dropzone from 'react-dropzone';
import React from 'react';
import { useState } from 'react';
import { useAuthContext } from '../context/ApiContext';
import Banner from './Banner';

export const FileUpload = ({ sendPhoto }) => {
  const [success, setSuccess] = useState();
  const { workService } = useAuthContext();

  const dropHandler = async (file) => {
    const photo = await workService.uploadImage(file);
    sendPhoto(photo.fileName);
    setSuccess('Successfully Uploaded!');
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  return (
    <>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <button>
                Drag & Drop Here <br /> or Click Here
              </button>
            </div>
          </section>
        )}
      </Dropzone>
      {success && <Banner text={success} />}
    </>
  );
};

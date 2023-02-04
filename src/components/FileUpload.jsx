import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useApiContext } from '../context/ApiContext';
import Banner from './ui/Banner';

export const FileUpload = ({ sendPhoto }) => {
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const { workService } = useApiContext();

  const dropHandler = async (file) => {
    await workService
      .uploadImage(file)
      .then((photo) => {
        sendPhoto(photo);
        setSuccess('Successfully Uploaded!');
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      })
      .catch((error) => setError((prev) => error.toString()));
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
      {error && <Banner text={error} />}
    </>
  );
};

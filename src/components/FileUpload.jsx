import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useApiContext } from '../context/ApiContext';
import toast from 'react-hot-toast';

export const FileUpload = ({ sendPhoto }) => {
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const { workService } = useApiContext();

  useEffect(() => {
    success && toast.success(success);
  }, [success]);

  useEffect(() => {
    error && toast.success(error);
  }, [error]);

  const dropHandler = async (file) => {
    await workService
      .uploadImage(file)
      .then((photo) => {
        sendPhoto(photo);
        setSuccess('Your photo is successfully Uploaded!');
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
    </>
  );
};

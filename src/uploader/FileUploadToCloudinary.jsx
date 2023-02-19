import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Dropzone from 'react-dropzone';
import { MdDownloading } from 'react-icons/md';
import { BsCheckLg } from 'react-icons/bs';
import Banner from '../components/ui/Banner';
import { uploadImage } from './uploader';

export const FileUploadToCloudinary = ({ sendImageData }) => {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    error && toast.success(error);
  }, [error]);

  const dropHandler = async (file) => {
    setIsLoading(true);
    uploadImage(file[0])
      .then((data) => {
        sendImageData(data);
        setIsLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
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
                {isLoading && (
                  <div className="flex items-center justify-center gap-2 text-xl">
                    <MdDownloading className="text-xl" />
                    <Banner text="Loading..." />
                  </div>
                )}
                {success && (
                  <div className="flex items-center justify-center gap-2 text-xl">
                    <BsCheckLg className="text-xl" />
                    <Banner text="Your image is successfully uploaded" />
                  </div>
                )}
                {!success && !isLoading && (
                  <p>
                    Drag & Drop Here <br /> or Click Here
                  </p>
                )}
              </button>
            </div>
          </section>
        )}
      </Dropzone>
    </>
  );
};

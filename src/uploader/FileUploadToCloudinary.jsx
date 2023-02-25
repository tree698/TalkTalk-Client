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
    if (!isImageFile(file[0])) {
      window.alert('Only image files can be uploaded');
      return;
    }
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
                  <div className="flex items-center justify-center gap-1 lg:gap-2 text-xs md:text-sm lg:text-base">
                    <MdDownloading className="text-xl" />
                    <Banner text="Loading..." />
                  </div>
                )}
                {success && (
                  <div className="flex items-center justify-center gap-1 lg:gap-2 text-xs md:text-sm lg:text-base">
                    <BsCheckLg className="text-sm md:text-lg lg:text-xl" />
                    <Banner text="Your image is successfully uploaded" />
                  </div>
                )}
                {!success && !isLoading && (
                  <p className="text-[10px] md:text-xs lg:text-sm">
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

function isImageFile(file) {
  return file.type.includes('image/');
}

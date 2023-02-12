import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsPlusLg } from 'react-icons/bs';
import { BsChevronRight } from 'react-icons/bs';
import { MdDownloading } from 'react-icons/md';
import { useApiContext } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from '../components/FileUpload';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Banner from '../components/ui/Banner';

export default function Upload() {
  const [info, setInfo] = useState({ title: '', description: '', brush: '' });
  const [fileName, setFileName] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { workService } = useApiContext();
  const navigate = useNavigate();

  useEffect(() => {
    success && toast.success(success);
  }, [success]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handlePhoto = (photo) => {
    setFileName((prev) => photo.fileName);
    setOriginalName((prev) => photo.originalName);
  };

  const handleCancel = () => {
    setFileName('');
    setOriginalName();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    workService
      .createWork(
        info.title,
        info.description,
        info.brush,
        originalName,
        fileName
      )
      .then(() => {
        setSuccess('Successfully Uploaded!');
        setTimeout(() => {
          setSuccess(undefined);
        }, 3000);
        setTimeout(() => {
          navigate('/home');
        }, 3000);
      })
      .catch((error) => setError((prev) => error.toString()))
      .finally(() => setIsLoading(false));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((prev) => ({ ...info, [name]: value }));
  };

  const INPUT_STYLE =
    'w-full px-2 py-3 text-xl outline-none rounded-md border border-superLightGray mb-3 placeholder:text-superLightGray placeholder:italic placeholder:text-lg';
  const FILE_UPLOAD_STYLE =
    'h-[378px] flex items-center justify-center rounded-lg text-xl border-2 border-superLightGray shadow-inner shadow-xl';
  const LABEL_STYLE = 'text-xl mb-2';

  return (
    <section className="w-full h-full flex flex-col">
      <Navbar />
      <section className="flex-1 max-w-5xl w-full mx-auto">
        <div className="flex justify-center">
          <h2 className="text-3xl font-semibold m-12">Upload your drawing</h2>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className={`${FILE_UPLOAD_STYLE}`}>
            <FileUpload sendPhoto={handlePhoto} />
          </div>
          <div className={`${FILE_UPLOAD_STYLE}`}>
            {fileName ? (
              <img
                src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${fileName}`}
                alt={info.title}
                className="w-full h-full"
              />
            ) : (
              <BsPlusLg />
            )}
          </div>
        </div>
        <div>
          {fileName && (
            <div>
              {isLoading && (
                <div className="flex items-center justify-center gap-4 mt-12 text-2xl">
                  <MdDownloading className="text-3xl" />
                  <Banner text="Loading..." />
                </div>
              )}
              <button
                onClick={handleCancel}
                className="flex items-center justify-center mx-auto w-[400px] text-xl text-center py-3 m-10 border border-superLightGray rounded-2xl shadow-xl hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out"
              >
                <BsChevronRight className=" mr-5" />
                <p>Want you to cancel it?</p>
              </button>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className={`${LABEL_STYLE}`}>
            Title
          </label>{' '}
          <br />
          <input
            type="text"
            name="title"
            value={info.title}
            onChange={handleChange}
            placeholder="Title"
            id="title"
            required
            className={`${INPUT_STYLE}`}
          />
          <br />
          <label htmlFor="brush" className={`${LABEL_STYLE}`}>
            Brush
          </label>{' '}
          <br />
          <input
            type="text"
            name="brush"
            value={info.brush}
            onChange={handleChange}
            placeholder="(Optional) Brush"
            id="brush"
            className={`${INPUT_STYLE}`}
          />
          <br />
          <label htmlFor="description" className={`${LABEL_STYLE}`}>
            Say something
          </label>
          <br />
          <textarea
            name="description"
            value={info.description}
            onChange={handleChange}
            cols="30"
            rows="3"
            placeholder="(Optional) Say something"
            id="description"
            className={`${INPUT_STYLE}`}
          ></textarea>
          <br />
          <div className="flex justify-center">
            <button className="w-[400px] py-3 px-2 my-6 text-xl font-semibold text-center text-white bg-accent rounded-2xl hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out">
              Submit
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </section>
  );
}

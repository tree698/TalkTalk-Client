import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsPlusLg } from 'react-icons/bs';
import { BsChevronRight } from 'react-icons/bs';
import { MdDownloading } from 'react-icons/md';
import { useApiContext } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';
import { FileUploadToCloudinary } from '../uploader/FileUploadToCloudinary';
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

  // multer가 아닌 Cloudinary 사용 -> fileName은 url을 가리킴
  const handleImageData = (data) => {
    setFileName((prev) => updateURL(data.url));
    setOriginalName((prev) => data.original_filename);
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

  const FILE_UPLOAD_STYLE =
    'h-[200px] md:h-[300px] lg:h-[378px] text-base md:text-lg lg:text-xl flex items-center justify-center rounded-lg border-2 border-superLightGray shadow-inner shadow-xl';
  const LABEL_STYLE = 'text-sm md:text-lg lg:text-xl mb-1 md:mb-2';
  const INPUT_STYLE =
    'w-full px-1 md:px-2 py-1 md:py-2 lg:py-3 text-sm md:text-lg lg:text-xl outline-none rounded-md border border-superLightGray mb-1 md:mb-2 lg:mb-3 placeholder:text-superLightGray placeholder:italic placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg';

  return (
    <section className="w-screen h-screen flex flex-col">
      <Navbar />
      <section className="w-full max-w-xs md:max-w-2xl lg:max-w-5xl mx-auto flex-1">
        <div className="flex justify-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl m-6 md:m-8 lg:m-12 font-semibold">
            Upload your drawing
          </h2>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 md:mb-6 lg:mb-10">
          <div className={`${FILE_UPLOAD_STYLE}`}>
            <FileUploadToCloudinary sendImageData={handleImageData} />
          </div>
          <div className={`${FILE_UPLOAD_STYLE}`}>
            {fileName ? (
              <img src={fileName} alt={info.title} className="w-full h-full" />
            ) : (
              <BsPlusLg />
            )}
          </div>
        </div>
        <div>
          {fileName && (
            <div className="flex flex-col items-center">
              {isLoading && (
                <div className="flex items-center justify-center gap-4 mt-6 md:mt-10 lg:mt-12 text-lg md:text-xl lg:text-2xl">
                  <MdDownloading className="text-xl md:text-2xl lg:text-3xl" />
                  <Banner text="Loading..." />
                </div>
              )}
              <button
                onClick={handleCancel}
                className="w-[200px] md:w-[300px] lg:w-[400px] text-sm md:text-lg lg:text-xl py-1 md:py-2 lg:py-3 m-4 md:m-6 lg:m-10 flex items-center justify-center border border-superLightGray rounded-2xl shadow-xl hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out"
              >
                <BsChevronRight className=" mr-1 md:mr-3 lg:mr-5" />
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
            <button className="w-[200px] md:w-[340px] lg:w-[400px] py-1 md:py-2 lg:py-3 px-1 md:px-2 my-2 md:my-4 lg:my-6 text-sm md:text-lg lg:text-xl font-semibold text-center text-white bg-accent rounded-2xl hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out">
              Submit
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </section>
  );
}

function updateURL(url) {
  const spliteURL = url.split(':');
  const modify = `${spliteURL[0]}s:`;
  const updatedURLArray = [`${modify}`, `${spliteURL[1]}`];
  return updatedURLArray.join('');
}

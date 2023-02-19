import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import { FileUploadToCloudinary } from '../uploader/FileUploadToCloudinary';

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [url, setURL] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { authService } = useApiContext();

  useEffect(() => {
    success && toast.success(success);
  }, [success]);

  useEffect(() => {
    error && toast.success(error);
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    authService
      .signup(signupInfo.username, signupInfo.password, signupInfo.email, url)
      .then(() => {
        setSuccess('Successfully signed up. Please, login.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch((err) => setError(`Oops, ${err.toString()}`));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const INPUT_STYLE =
    'w-full px-2 md:px-2  py-1 md:py-2 lg:py-3 text-xl outline-none border-b border-superLightGray bg-signupLoginBG mb-3 placeholder:text-black placeholder:italic placeholder:text-base md:placeholder:text-lg lg:placeholder:text-xl';

  return (
    <section className="basis-1/2 lg:basis-2/5 w-full py-5 bg-signupLoginBG flex justify-center items-center">
      <div className="w-2/3">
        <h1 className="font-bold mb-6 md:mb-8 lg:mb-10 text-2xl md:text-3xl lg:text-4xl text-center">
          Create an account
        </h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          <input
            name="username"
            type="text"
            value={signupInfo.username ?? ''}
            onChange={handleChange}
            placeholder="Username (* Required)"
            required
            className={`${INPUT_STYLE}`}
          />
          <input
            name="email"
            type="email"
            value={signupInfo.email ?? ''}
            onChange={handleChange}
            placeholder="Email (* Required)"
            required
            className={`${INPUT_STYLE}`}
          />
          <input
            name="password"
            type="password"
            value={signupInfo.password ?? ''}
            onChange={handleChange}
            placeholder="Password (* Required)"
            required
            className={`${INPUT_STYLE}`}
          />
          <input
            disabled={true}
            placeholder="Photo (optional)"
            className="w-full px-2 py-2 outline-none bg-signupLoginBG placeholder:text-black placeholder:italic placeholder:text-base md:placeholder:text-lg lg:placeholder:text-xl';
            "
          />
        </form>
        <div className="border border-superLightGray rounded-md flex justify-center items-center py-3">
          <FileUploadToCloudinary
            sendImageData={(data) => setURL((prev) => updateURL(data.url))}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full mt-6 md:mt-12 mb-3 md:mb-5 py-1 md:py-2 lg:py-3 text-base md:text-lg lg:text-xl text-white bg-darkGray rounded-3xl transition-all delay-150 duration-300 ease-in-out hover:font-bold hover:scale-105 hover:shadow-xl"
        >
          Create account
        </button>

        <div className="flex justify-center items-center text-sm md:text-base lg:text-lg">
          <p className="mr-4">Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
            className="p-1 md:px-2 border-b border-gray-400 hover:bg-darkGray hover:text-white hover:scale-105 hover:rounded-lg transition-all delay-150 duration-300 ease-in-out hover:shadow-xl"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}

function updateURL(url) {
  const spliteURL = url.split(':');
  const modify = `${spliteURL[0]}s:`;
  const updatedURLArray = [`${modify}`, `${spliteURL[1]}`];
  return updatedURLArray.join('');
}

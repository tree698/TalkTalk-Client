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
    'w-full px-2 md:px-2 py-1 md:py-2 text-sm md:text-lg lg:text-base outline-none border-b border-superLightGray bg-signupLoginBG mb-1 md:mb-2 placeholder:text-black placeholder:italic placeholder:text-xs md:placeholder:text-sm';

  return (
    <section className="basis-1/2 lg:basis-2/5 w-full bg-signupLoginBG flex justify-center items-center">
      <div className="w-full px-14 lg:px-20">
        <h1 className="mb-2 md:mb-4 lg:mb-6 font-bold text-xl md:text-2xl lg:text-3xl text-center">
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
            className="w-full px-2 md:px-2 py-1 md:py-2 outline-none bg-signupLoginBG placeholder:text-black placeholder:italic placeholder:text-xs lg:placeholder:text-sm"
          />
        </form>
        <div className="border border-superLightGray rounded-md flex justify-center items-center py-1 md:py-2">
          <FileUploadToCloudinary
            sendImageData={(data) => setURL((prev) => updateURL(data.url))}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full mt-2 md:mt-4 lg:mt-6 mb-1 md:mb-2 lg:mb-3 py-1 md:py-2 text-xs md:text-sm lg:text-base text-white bg-darkGray rounded-3xl transition-all delay-150 duration-300 ease-in-out hover:font-bold hover:scale-105"
        >
          Create account
        </button>

        <div className="flex justify-center items-center text-[10px] md:text-xs lg:text-sm">
          <p className="mr-1 md:mr-2">Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
            data-testid="loginBtn"
            className="p-1 border-b border-gray-400 hover:bg-darkGray hover:text-white hover:scale-105 hover:rounded-lg transition-all delay-150 duration-300 ease-in-out hover:px-2
            "
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

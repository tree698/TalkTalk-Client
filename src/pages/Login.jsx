import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useApiContext } from '../context/ApiContext';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { logIn } = useApiContext();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn(loginInfo.username, loginInfo.password).catch((error) =>
      setError((prev) => error.toString())
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const INPUT_STYLE =
    'w-full px-1 md:px-2 py-1 md:py-2 lg:py-3 text-xl outline-none border border-superLightGray rounded mt-2 mb-5 placeholder:italic placeholder:text-superLightGray  placeholder:text-base md:placeholder:text-lg lg:placeholder:text-xl';

  return (
    <section className="basis-1/2 md:basis-1/2 lg:basis-2/5 py-5 md:py-0 w-full flex justify-center items-center  bg-signupLoginBG ">
      <div className="w-2/3">
        <div className="flex justify-end items-center">
          <p className="text-xs md:text-base">Don't you have an account?</p>
          <button
            className="px-5 py-1 ml-4 text-sm md:text-lg lg:text-base border border-superLightGray rounded-xl hover:bg-accent hover:text-white hover:scale-110 transition-all delay-150 duration-300 ease-in-out hover:shadow-xl"
            onClick={() => navigate('/signup')}
          >
            SIGN UP
          </button>
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl mt-6 md:mt-12 mb-3 font-bold  ">
          Welcome Back
        </h1>
        <p className="text-base mb-8">Login your account</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="text-base md:text-lg lg:text-xl"
            >
              Username
            </label>
            <br />
            <input
              type="text"
              name="username"
              value={loginInfo.username ?? ''}
              onChange={handleChange}
              placeholder="Your username"
              id="username"
              required
              className={`${INPUT_STYLE}`}
            />
            <br />
            <label htmlFor="password" className="text-base md:text-lg">
              Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              value={loginInfo.password ?? ''}
              onChange={handleChange}
              placeholder="Your password"
              id="password"
              required
              className={`${INPUT_STYLE}`}
            />
            <br />
          </div>
          <button className="w-full md:w-2/5 text-base md:text-lg lg:text-xl md:px-10 py-1 md:py-2 lg:py-3 mt-4  text-white bg-accent rounded-3xl transition-all delay-150 duration-300 ease-in-out hover:font-bold hover:scale-105 hover:shadow-xl">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

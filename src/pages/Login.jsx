import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useApiContext } from '../context/ApiContext';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { logIn } = useApiContext();

  // useEffect(() => {
  //   error && toast.error(error);
  // }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn(loginInfo.username, loginInfo.password); //
    // .catch((error) => setError((prev) => error.toString()));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const INPUT_STYLE =
    'w-full px-1 md:px-2 py-1 md:py-2 text-sm md:text-lg lg:text-base outline-none border border-superLightGray rounded mt-1 md:mt-2 mb-2 md:mb-4 placeholder:italic placeholder:text-superLightGray placeholder:text-xs md:placeholder:text-sm';

  return (
    <section className="basis-1/2 lg:basis-2/5 w-full flex justify-center items-center bg-signupLoginBG ">
      <div className="w-full px-14 lg:px-20">
        <div className="flex justify-end items-center">
          <p className="text-[10px] md:text-xs">Don't you have an account?</p>
          <button
            className="py-1 px-1 md:px-2 ml-2 md:ml-3 text-[10px] md:text-xs border border-superLightGray rounded-md hover:bg-accent hover:text-white transition-all delay-150 duration-300 ease-in-out"
            onClick={() => navigate('/signup')}
            data-testid="signupBtn"
          >
            SIGN UP
          </button>
        </div>

        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mt-4 md:mt-6 lg:mt-8 mb-1 ">
          Welcome Back
        </h1>
        <p className="text-[10px] md:text-x mb-4 md:mb-6 lg:mb-8">
          Login your account
        </p>

        <form onSubmit={handleSubmit} role="form">
          <div>
            <label
              htmlFor="username"
              className="text-xs md:text-sm lg:text-base"
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
            <label
              htmlFor="password"
              className="text-xs md:text-sm lg:text-base"
            >
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
          <button
            data-testid="loginBtn"
            className="w-full lg:w-2/5 text-sm md:text-lg lg:text-base py-1 md:py-2 mt-4  text-white bg-accent rounded-3xl transition-all delay-150 duration-300 ease-in-out hover:font-bold hover:scale-105 hover:shadow-xl"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

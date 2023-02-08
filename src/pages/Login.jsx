import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import Banner from '../components/ui/Banner';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { logIn } = useApiContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    // 왜 then(() => navigate('/home')) 필요 없을까?
    logIn(loginInfo.username, loginInfo.password).catch((error) =>
      setError((prev) => error.toString())
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const INPUT_STYLE =
    'w-full px-2 py-3 text-xl outline-none border border-superLightGray rounded mt-2 mb-5 placeholder:italic placeholder:text-superLightGray placeholder:text-xl';

  return (
    <section className="w-full basis-1/2 lg:basis-2/5 bg-signupLoginBG flex justify-center items-center">
      <div className="basis-4/6">
        <div className="flex justify-end items-center">
          <p className="text-base">Don't you have an account?</p>
          <button
            className="px-5 py-1 ml-4 text-base border border-superLightGray rounded-xl hover:bg-accent hover:text-white hover:scale-110 transition-all delay-150 duration-300 ease-in-out hover:shadow-xl"
            onClick={() => navigate('/signup')}
          >
            SIGN UP
          </button>
        </div>

        <h1 className="font-bold mt-12 mb-3 text-3xl md:text-3xl lg:text-4xl">
          Welcome Back
        </h1>
        {error && <Banner text={error} />}
        <p className="text-base mb-8">Login your account</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="text-lg">
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
            <label htmlFor="password" className="text-lg">
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
          <button className="w-2/5 text-white bg-accent px-16 py-3 mt-4 text-2xl rounded-3xl transition-all delay-150 duration-300 ease-in-out hover:font-bold hover:scale-105 hover:shadow-xl">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

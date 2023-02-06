import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import Button from '../components/ui/Button';
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

  return (
    <section className="w-full basis-2/5 bg-background flex flex-col justify-center">
      <div>
        <p>Don't you have an account?</p>
        <button onClick={() => navigate('/signup')}>SIGN UP</button>
      </div>

      <h1>Welcome Back</h1>
      {error && <Banner text={error} />}
      <p>Login your account</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            name="username"
            value={loginInfo.username ?? ''}
            onChange={handleChange}
            placeholder="Your username"
            id="username"
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={loginInfo.password ?? ''}
            onChange={handleChange}
            placeholder="Your password"
            id="password"
            required
          />
          <br />
        </div>
        <Button text="Login" />
      </form>
    </section>
  );
}

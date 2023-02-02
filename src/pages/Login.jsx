import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import Button from '../components/ui/Button';
import Banner from '../components/Banner';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const [text, setText] = useState('');

  const navigate = useNavigate();
  const { authService } = useApiContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    authService
      .login(loginInfo.username, loginInfo.password)
      .then(() => navigate('/home'))
      .catch((err) => setText(`Oops, ${err.toString()}`));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  return (
    <div>
      <div>
        <p>Don't you have an account?</p>
        <button onClick={() => navigate('/signup')}>SIGN UP</button>
      </div>

      <h1>Welcome Back</h1>
      <Banner text={text} />
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
    </div>
  );
}

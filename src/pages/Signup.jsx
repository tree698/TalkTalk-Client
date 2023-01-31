import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Banner from '../components/Banner';
import { FileUpload } from '../components/FileUpload';

export default function Signup() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState();
  const [text, setText] = useState();

  const navigate = useNavigate();
  const { authService } = useAuthContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    authService
      .signup(username, password, email, photo)
      .then(() => {
        setText('Successfully signed up. Please, login.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch((err) => setText(`Oops, ${err.toString()}`));
  };

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case 'username':
        return setUsername(value);
      case 'password':
        return setPassword(value);
      case 'email':
        return setEmail(value);
      default:
    }
  };

  return (
    <div>
      <div>
        <h1>Create an account</h1>
        <Banner text={text} />
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            value={username ?? ''}
            onChange={handleChange}
            placeholder="Username (* Required)"
            required
          />
          <input
            name="email"
            type="email"
            value={email ?? ''}
            onChange={handleChange}
            placeholder="Email (* Required)"
            required
          />
          <input
            name="password"
            type="password"
            value={password ?? ''}
            onChange={handleChange}
            placeholder="Password (* Required)"
            required
          />
          <input disabled={true} placeholder="Photo (optional)" />
          <div>
            <FileUpload sendPhoto={setPhoto} />
          </div>
          <button type="submit">Create account</button>
        </form>

        <div>
          <p>Already have an account?</p>
          <button onClick={() => navigate('/login')}>Log in</button>
        </div>
      </div>
    </div>
  );
}

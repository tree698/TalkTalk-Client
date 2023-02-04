import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import { FileUpload } from '../components/FileUpload';
import Button from '../components/ui/Button';
import Banner from '../components/ui/Banner';

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [photo, setPhoto] = useState();
  const [text, setText] = useState();

  const navigate = useNavigate();
  const { authService } = useApiContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    authService
      .signup(
        signupInfo.username,
        signupInfo.password,
        signupInfo.email,
        photo.fileName
      )
      .then(() => {
        setText('Successfully signed up. Please, login.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch((err) => setText(`Oops, ${err.toString()}`));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
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
            value={signupInfo.username ?? ''}
            onChange={handleChange}
            placeholder="Username (* Required)"
            required
          />
          <input
            name="email"
            type="email"
            value={signupInfo.email ?? ''}
            onChange={handleChange}
            placeholder="Email (* Required)"
            required
          />
          <input
            name="password"
            type="password"
            value={signupInfo.password ?? ''}
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
          <Button text="Login" onClick={() => navigate('/login')} />
        </div>
      </div>
    </div>
  );
}

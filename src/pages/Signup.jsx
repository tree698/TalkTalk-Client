import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import { FileUpload } from '../components/FileUpload';
import Banner from '../components/ui/Banner';

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [photo, setPhoto] = useState('');
  const [text, setText] = useState('');

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

  const INPUT_STYLE =
    'w-full px-2 py-3 text-xl outline-none border-b border-superLightGray bg-signupLoginBG mb-3 placeholder:text-black placeholder:italic placeholder:text-lg';

  return (
    <section className="w-full basis-1/2 lg:basis-2/5 bg-signupLoginBG flex justify-center items-center">
      <div className="basis-4/6">
        <h1 className="font-bold mb-10 text-3xl md:text-3xl lg:text-4xl text-center">
          Create an account
        </h1>
        {text && <Banner text={text} />}
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
            className="w-full px-2 py-2 outline-none bg-signupLoginBG placeholder:text-black placeholder:italic placeholder:text-lg"
          />
          <div className="border border-superLightGray rounded-md flex justify-center items-center py-3">
            <FileUpload sendPhoto={setPhoto} />
          </div>
          <button
            type="submit"
            className="w-full mt-12 mb-5 py-3 text-white bg-darkGray text-xl rounded-3xl transition-all delay-150 duration-300 ease-in-out hover:font-bold hover:scale-105 hover:shadow-xl"
          >
            Create account
          </button>
        </form>

        <div className="flex justify-center items-center text-lg">
          <p className="mr-4">Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
            className="border-b border-gray-400 hover:bg-darkGray hover:text-white hover:scale-105 hover:rounded-lg hover:py-1 hover:px-3 transition-all delay-150 duration-300 ease-in-out hover:shadow-xl"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}

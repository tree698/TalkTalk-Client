import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';
import { useApiContext } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';

const ICONHOVER = 'hover:rotate-17 hover:text-brand';

export default function Navbar() {
  const { logOut } = useApiContext();
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.confirm('Do you want to log out?')) {
      logOut().then(() => navigate('/'));
    }
  };

  return (
    <header className="w-full flex justify-between border-b-2 border-gray-300 px-20 py-6 mx-auto">
      <Link to="/home" className="flex items-center text-4xl gap-3">
        <img
          src="image/logo.png"
          alt="logo"
          className="w-2/6 hover:scale-105 hover:brightness-110"
        />
      </Link>
      <nav className="flex items-center text-5xl gap-8 font-semibold">
        <Link to="/home">
          <AiOutlineHome className={ICONHOVER} />
        </Link>
        {/* <Link to="/talk">
          <BsChatDots className={ICONHOVER} />
        </Link> */}
        <Link to="/upload">
          <AiOutlineCloudUpload className={ICONHOVER} />
        </Link>
        <button onClick={handleClick}>
          <AiOutlineLogout className={ICONHOVER} />
        </button>
      </nav>
    </header>
  );
}

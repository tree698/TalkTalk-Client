import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';
import { useApiContext } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';

const ICONHOVER =
  'hover:rotate-17 hover:text-brand transition-all ease-in delay-200';

export default function Navbar() {
  const { logOut } = useApiContext();
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.confirm('Do you want to log out?')) {
      logOut().then(() => navigate('/'));
    }
  };

  return (
    <header
      style={{ boxShadow: '0px 0px 12px 1px rgba(124, 121, 121, 1)' }}
      className="w-full flex justify-between border-b-2 border-gray-300 mx-auto px-10 md:px-12 lg:px-14 py-1 md:py-2 lg:py-3 "
    >
      <Link to="/home">
        <img
          src="images/logo.png"
          alt="logo"
          className="w-2/6 hover:scale-105 hover:brightness-110 transition-all ease-in delay-200"
        />
      </Link>
      <nav className="flex items-center text-2xl md:text-3xl lg:text-4xl gap-4 md:gap-6 lg:gap-8">
        <Link to="/home">
          <AiOutlineHome className={ICONHOVER} />
        </Link>
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

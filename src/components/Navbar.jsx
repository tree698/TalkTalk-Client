import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';
import { useApiContext } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';
import LoggedInUser from './LoggedInUser';

const STYLE_FOR_ICON_HOVER =
  'hover:rotate-17 hover:text-brand transition-all delay-150 duration-300 ease-in-out';
const STYLE_FOR_LOGGEDINUSER = 'flex items-center shrink-0 mt-3';
const STYLE_FOR_AVATAR = 'w-10 h-10 rounded-full mr-2';
const STYLE_FOR_USERNAME = 'hidden md:block text-sm';

export default function Navbar() {
  const { user, logOut } = useApiContext();
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.confirm('Do you want to log out?')) {
      logOut().then(() => navigate('/'));
    }
  };

  return (
    <header
      style={{ boxShadow: '0px 1px 9px 3px rgba(124, 121, 121, 0.2)' }}
      className="w-full flex justify-between border-b border-superLightGray mx-auto px-10 md:px-12 lg:px-14 py-1 md:py-2 lg:py-3 "
    >
      <Link to="/home">
        <img
          src="images/logo.png"
          alt="logo"
          className="w-2/6 hover:scale-105 hover:brightness-110 transition-all delay-150 duration-300 ease-in-out"
        />
      </Link>
      <nav className="flex items-center text-2xl md:text-3xl lg:text-4xl gap-4 md:gap-6 lg:gap-8">
        <Link to="/home">
          <AiOutlineHome className={STYLE_FOR_ICON_HOVER} />
        </Link>
        <Link to="/upload">
          <AiOutlineCloudUpload className={STYLE_FOR_ICON_HOVER} />
        </Link>
        <LoggedInUser
          photo={user.photo}
          username={user.username}
          styleForAvatar={STYLE_FOR_AVATAR}
          styleForUsername={STYLE_FOR_USERNAME}
          styleForLoggedInUser={STYLE_FOR_LOGGEDINUSER}
        />
        <button onClick={handleClick}>
          <AiOutlineLogout className={STYLE_FOR_ICON_HOVER} />
        </button>
      </nav>
    </header>
  );
}

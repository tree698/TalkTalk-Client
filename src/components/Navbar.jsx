import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';
import { useApiContext } from '../context/ApiContext';
import LoggedInUser from './LoggedInUser';

const STYLE_FOR_ICON_HOVER =
  'hover:rotate-17 hover:text-brand transition-all delay-150 duration-300 ease-in-out';
const STYLE_FOR_LOGGEDINUSER = 'flex items-center shrink-0';
const STYLE_FOR_AVATAR =
  'w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 mr-0 lg:mr-2 rounded-full';
const STYLE_FOR_USERNAME = 'text-sm hidden lg:block';

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
      className="w-full px-3 md:px-9 lg:px-12 py-1 md:py-2 lg:py-3 border-b flex justify-between border-superLightGray"
    >
      <div className="hover:scale-105 hover:brightness-110 transition-all delay-150 duration-300 ease-in-out">
        <Link to="/home" className="">
          <img src="images/logo.png" alt="logo" className="w-2/6" />
        </Link>
      </div>
      <nav className="text-xl md:text-3xl lg:text-4xl gap-2 md:gap-4 lg:gap-6 flex items-center">
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

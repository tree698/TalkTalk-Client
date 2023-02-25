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
  'w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-0 lg:mr-1 rounded-full';
const STYLE_FOR_USERNAME = 'text-xs md:text-sm hidden lg:block';

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
      className="w-full py-2 px-5 z-10 border-b flex justify-between border-superLightGray"
    >
      <div className="hover:brightness-110 transition-all delay-150 duration-300 ease-in-out">
        <Link to="/home" className="">
          <img
            src="images/logo.png"
            alt="logo"
            className="w-32 md:w-36 lg:w-40"
          />
        </Link>
      </div>
      <nav className="text-lg md:text-xl lg:text-2xl gap-1 md:gap-2 lg:gap-3 flex items-center">
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

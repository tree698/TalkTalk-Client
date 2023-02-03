import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';

const ICONHOVER = 'hover:rotate-17 hover:text-brand';

export default function Navbar() {
  const { logOut } = useApiContext();

  const handleClick = () => {
    if (window.confirm('Do you want to log out?')) {
      // 왜 then(() => navigate('/'))가 필요 없지?
      logOut();
    }
  };

  return (
    <header className="flex justify-between border-b border-gray-300 p-5 ">
      <Link to="/home" className="flex items-center text-3xl text-brand gap-3">
        <img src="" alt="logo" />
        <h1 className="font-semibold">TalkTalk</h1>
      </Link>
      <nav className="flex items-center text-3xl gap-8 font-semibold">
        <Link to="/home">
          <AiOutlineHome className={ICONHOVER} />
        </Link>
        <Link to="/home/talk">
          <BsChatDots className={ICONHOVER} />
        </Link>
        <Link to="/home/upload">
          <AiOutlineCloudUpload className={ICONHOVER} />
        </Link>
        <button onClick={handleClick}>
          <AiOutlineLogout className={ICONHOVER} />
        </button>
      </nav>
    </header>
  );
}

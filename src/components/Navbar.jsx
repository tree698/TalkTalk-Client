import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';

const ICONHOVER = 'hover:rotate-17 hover:text-brand';

export default function Navbar() {
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
        <p>
          <AiOutlineLogout className={ICONHOVER} />
        </p>
      </nav>
    </header>
  );
}

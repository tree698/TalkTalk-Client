import React from 'react';
import { useLocation } from 'react-router-dom';
import LoggedInUser from './LoggedInUser';
import { MdOutlineTitle } from 'react-icons/md';
import { BsBrush } from 'react-icons/bs';
import { BsChatLeftDots } from 'react-icons/bs';

export default function SelectedDrawing() {
  const STYLE_FOR_LOGGEDINUSER =
    'flex items-center justify-center shrink-0 my-8';
  const STYLE_FOR_AVATAR = 'w-16 h-16 rounded-full mr-4';
  const STYLE_FOR_USERNAME = 'hidden md:block text-2xl font-semibold';
  const STYLE_FOR_LI = 'flex items-center gap-4 mb-3';

  const {
    state: { fileName, title, username, brush, description, photo },
  } = useLocation();

  return (
    <div className="basis-1/2 flex-1 flex flex-col justify-center items-center">
      <img
        src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${fileName}`}
        alt={title}
        className="border border-superLightGray shadow-lg rounded-md"
      />
      <LoggedInUser
        photo={photo}
        username={username}
        styleForAvatar={STYLE_FOR_AVATAR}
        styleForUsername={STYLE_FOR_USERNAME}
        styleForLoggedInUser={STYLE_FOR_LOGGEDINUSER}
      />
      <ul className="w-full text-xl px-5 pb-5">
        <li className={STYLE_FOR_LI}>
          <MdOutlineTitle className="text-2xl" />:<span> {title}</span>
        </li>
        <li className={STYLE_FOR_LI}>
          <BsBrush className="text-2xl" />:<span> {brush}</span>
        </li>
        <li className={STYLE_FOR_LI}>
          <BsChatLeftDots className="text-2xl" />:<span> {description}</span>
        </li>
      </ul>
    </div>
  );
}

import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdOutlineTitle } from 'react-icons/md';
import { BsBrush } from 'react-icons/bs';
import { BsChatLeftDots } from 'react-icons/bs';
import LoggedInUser from './LoggedInUser';

export default function SelectedDrawing() {
  const STYLE_FOR_AVATAR =
    'w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 mr-1 md:mr-2 lg:mr-3 rounded-full';
  const STYLE_FOR_USERNAME = 'text-xs md:text-sm lg:text-base font-semibold';
  const STYLE_FOR_LOGGEDINUSER =
    'flex items-center justify-center shrink-0 my-2 md:my-3 lg:my-4';
  const STYLE_FOR_LI =
    'flex items-center w-full gap-x-1 md:gap-x-2 lg:gap-x-3 mb-1 md:mb-2 ';

  const {
    state: { fileName, title, username, brush, description, photo },
  } = useLocation();

  return (
    <div className="basis-1/2 flex flex-col justify-center items-center px-10 md:px-12 lg:pl-0 lg:pr-8">
      <img
        src={fileName}
        alt={title}
        className="w-full border border-superLightGray shadow-lg rounded-md"
      />
      <LoggedInUser
        photo={photo}
        username={username}
        styleForAvatar={STYLE_FOR_AVATAR}
        styleForUsername={STYLE_FOR_USERNAME}
        styleForLoggedInUser={STYLE_FOR_LOGGEDINUSER}
      />
      <ul className="w-full text-[10px] md:text-xs lg:text-sm">
        <li className={STYLE_FOR_LI}>
          <MdOutlineTitle className="text-sm md:text-base lg:text-lg" />:
          <span> {title}</span>
        </li>
        <li className={STYLE_FOR_LI}>
          <BsBrush className="text-sm md:text-base lg:text-lg" />:
          <span> {brush}</span>
        </li>
        <li className={STYLE_FOR_LI}>
          <BsChatLeftDots className="text-lg md:text-base lg:text-xl" />:
          <span> {description}</span>
        </li>
      </ul>
    </div>
  );
}

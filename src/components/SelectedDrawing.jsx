import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdOutlineTitle } from 'react-icons/md';
import { BsBrush } from 'react-icons/bs';
import { BsChatLeftDots } from 'react-icons/bs';
import LoggedInUser from './LoggedInUser';

export default function SelectedDrawing() {
  const STYLE_FOR_LOGGEDINUSER =
    'flex items-center justify-center shrink-0 my-4 md:my-6 lg:my-8';
  const STYLE_FOR_AVATAR =
    'w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 mr-2 md:mr-4 lg:mr-6 rounded-full';
  const STYLE_FOR_USERNAME = 'text-base md:text-xl lg:text-2xl font-semibold';
  const STYLE_FOR_LI =
    'gap-2 md:gap-3 lg:gap-4 mb-1 md:mb-2 lg:mb-3 flex items-center';

  const {
    state: { fileName, title, username, brush, description, photo },
  } = useLocation();

  return (
    <div className="mr-0 md:mr-4 lg:mr-8 basis-1/2 flex flex-col justify-center items-center">
      <img
        src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${fileName}`}
        alt={title}
        className="w-2/3 md:w-5/6 lg:w-full border border-superLightGray shadow-lg rounded-md"
      />
      <LoggedInUser
        photo={photo}
        username={username}
        styleForAvatar={STYLE_FOR_AVATAR}
        styleForUsername={STYLE_FOR_USERNAME}
        styleForLoggedInUser={STYLE_FOR_LOGGEDINUSER}
      />
      <ul className="w-full text-sm md:text-lg lg:text-xl px-3 md:px-4 lg:px-5 pb-3 md:pb-4 lg:pb-5">
        <li className={STYLE_FOR_LI}>
          <MdOutlineTitle className="text-base md:text-xl lg:text-2xl" />:
          <span> {title}</span>
        </li>
        <li className={STYLE_FOR_LI}>
          <BsBrush className="text-base md:text-xl lg:text-2xl" />:
          <span> {brush}</span>
        </li>
        <li className={STYLE_FOR_LI}>
          <BsChatLeftDots className="text-base md:text-xl lg:text-2xl" />:
          <span> {description}</span>
        </li>
      </ul>
    </div>
  );
}

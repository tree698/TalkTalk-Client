import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoggedInUser from './LoggedInUser';

export default function DisplayDrawing({
  drawing,
  checkboxForDelete,
  toBeDeletedId,
}) {
  const { id, fileName, title, username, brush, description, photo } = drawing;
  const navigate = useNavigate();

  const STYLE_FOR_LOGGEDINUSER = 'flex items-center justify-center shrink-0';
  const STYLE_FOR_AVATAR =
    'w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6 rounded-full mr-0 md:mr-1 lg:mr-2';
  const STYLE_FOR_USERNAME = 'hidden md:block text-xs md:text-sm';

  return (
    <section className="flex flex-col">
      {checkboxForDelete && (
        <input
          name="delete"
          id="delete"
          onChange={() => toBeDeletedId(id)}
          type="checkbox"
          data-testid="delete"
          className="w-3 h-3 lg:w-4 lg:h-4 ml-2 mb-1 border border-superLightGray"
        />
      )}
      <li
        onClick={() =>
          navigate('/talk', {
            state: { id, fileName, title, username, brush, description, photo },
          })
        }
        className="border border-superLightGray list-none rounded-xl shadow-lg cursor-pointer overflow-hidden hover:-translate-y-1 hover:brightness-125 transition-all delay-150 duration-300 ease-in-out"
      >
        <img
          src={fileName}
          alt={title}
          className="w-full h-[246px] md:h-[185px] lg:h-[158px]"
        />
        <div className="flex items-center justify-center md:flex-col gap-x-2 md:gap-x-0 p-1 md:p-2 lg:p-3">
          <p className="mb-1 md:mb-2 text-xs md:text-sm lg:text-base font-semibold">
            {title}
          </p>
          <LoggedInUser
            photo={photo}
            username={username}
            styleForAvatar={STYLE_FOR_AVATAR}
            styleForUsername={STYLE_FOR_USERNAME}
            styleForLoggedInUser={STYLE_FOR_LOGGEDINUSER}
          />
        </div>
      </li>
    </section>
  );
}

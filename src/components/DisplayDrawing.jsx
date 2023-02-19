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

  const STYLE_FOR_LOGGEDINUSER =
    'flex items-center justify-center shrink-0 mt-0md:mt-3';
  const STYLE_FOR_AVATAR =
    'w-5 md:w-6 lg:w-8 h-5 md:h-6 lg:h-8 rounded-full mr-0 md:mr-2';
  const STYLE_FOR_USERNAME = 'hidden md:block text-sm';

  return (
    <section className="flex flex-col">
      {checkboxForDelete && (
        <input
          name="delete"
          id="delete"
          onChange={() => toBeDeletedId(id)}
          type="checkbox"
          className="w-3 md:w-4 lg:w-5 h-3 md:h-4 lg:h-5 ml-4 mb-1 border border-lightGray"
        />
      )}
      <li
        onClick={() =>
          navigate('/talk', {
            state: { id, fileName, title, username, brush, description, photo },
          })
        }
        className="list-none rounded-xl shadow-lg cursor-pointer hover:-translate-y-1 hover:brightness-125 transition-all delay-150 duration-300 ease-in-out"
      >
        <img
          src={fileName}
          alt={title}
          className="w-full h-[247px] rounded-t-xl"
        />
        <div className="flex items-center justify-center md:flex-col gap-x-2 md:gap-x-0 p-1 md:p-2 lg:p-3">
          <p className="mb-1 md:mb-2 lg:mb-3 text-sm md:text-lg lg:text-xl font-semibold">
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

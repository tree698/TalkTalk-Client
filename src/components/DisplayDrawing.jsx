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
    'flex items-center justify-center shrink-0 mt-3';
  const STYLE_FOR_AVATAR = 'w-8 h-8 rounded-full mr-2';
  const STYLE_FOR_USERNAME = 'hidden md:block text-sm';

  return (
    <section className="flex flex-col">
      {checkboxForDelete && (
        <input
          name="delete"
          id="delete"
          onChange={() => toBeDeletedId(id)}
          type="checkbox"
          className="w-5 h-5 ml-4 mb-1 border border-lightGray"
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
          src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${fileName}`}
          alt={title}
          className="w-full h-[247px] rounded-t-xl"
        />
        <div className="flex items-center justify-center gap-x-2 md:gap-x-0 md:flex-col p-3 text-center">
          <p className="text-xl font-semibold">{title}</p>
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

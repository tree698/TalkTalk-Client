import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SlUserFollowing } from 'react-icons/sl';

export default function DisplayDrawing({
  drawing,
  checkboxForDelete,
  toBeDeletedId,
}) {
  const { id, fileName, title, username, brush, description } = drawing;
  const navigate = useNavigate();

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
            state: { id, fileName, title, username, brush, description },
          })
        }
        className="list-none rounded-xl shadow-lg cursor-pointer hover:-translate-y-1 hover:brightness-125 transition-all delay-150 duration-300 ease-in-out"
      >
        <img
          src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${fileName}`}
          alt={title}
          className="w-full rounded-t-xl"
        />
        <div className="p-3 text-center">
          <p className="text-xl font-semibold">{title}</p>
          <div className="flex justify-center items-center text-lightGray text-md mt-2">
            <SlUserFollowing />
            <p className="ml-2">{username}</p>
          </div>
        </div>
      </li>
    </section>
  );
}

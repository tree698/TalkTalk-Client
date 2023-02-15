import React from 'react';
import { formatAgo } from '../util/date';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Avatar from './Avatar';

export default function TweetCard({ owner, tweet, onAvatarClick, onDelete }) {
  const { id, text, createdAt, username, photo } = tweet;

  return (
    <li
      className={
        owner
          ? 'flex items-start justify-end mb-2 md:mb-3 lg:mb-4 text-sm sm:text-base md:text-lg'
          : 'flex items-start justify-start mb-2 md:mb-3 lg:mb-4 text-sm sm:text-base md:text-lg'
      }
    >
      <button
        onClick={() => onAvatarClick(username)}
        className={owner ? 'order-1' : ''}
      >
        <Avatar
          photo={photo}
          username={username}
          styleForAvatar={
            owner
              ? 'w-8 lg:w-10 h-8 lg:h-10 rounded-full ml-2'
              : 'w-8 lg:w-10 h-8 lg:h-10 rounded-full mr-2'
          }
        />
      </button>
      <div
        className={
          owner
            ? 'ml-2 w-4/6 py-2 px-5 border border-lightGray rounded-tl-2xl rounded-b-2xl bg-subBrand text-white'
            : 'ml-2 w-4/6 py-2 px-5 border border-lightGray rounded-tr-2xl rounded-b-2xl'
        }
      >
        <div className="flex justify-between text-sm md:text-base lg:text-base mb-1">
          <p className={owner ? 'order-1' : ''}>{username}</p>
          <p>{formatAgo(createdAt)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">{text}</p>
          {owner && (
            <button
              onClick={() => onDelete(id)}
              className="hover:scale-110 hover:rotate-17 hover:text-black transition-all delay-150 duration-300 ease-in-out"
            >
              <RiDeleteBin6Line />
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

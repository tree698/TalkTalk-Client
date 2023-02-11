import React from 'react';
import { formatAgo } from '../util/date';
import Avatar from './Avatar';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function TweetCard({ owner, tweet, onAvatarClick, onDelete }) {
  const { id, text, createdAt, username, photo } = tweet;

  return (
    <li
      className={
        owner
          ? 'flex items-start justify-end mb-4 text-lg'
          : 'flex items-start justify-start mb-4 text-lg'
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
              ? 'w-10 h-10 rounded-full ml-2'
              : 'w-10 h-10 rounded-full mr-2'
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
        <div className="flex justify-between text-base mb-1">
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

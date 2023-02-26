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
          ? 'flex items-start justify-end mb-1 md:mb-2 lg:mb-3 text-[10px] sm:text-xs md:text-sm'
          : 'flex items-start justify-start mb-1 md:mb-2 lg:mb-3 text-[10px] sm:text-xs md:text-sm'
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
              ? 'w-6 lg:w-8 h-6 lg:h-8 rounded-full ml-1'
              : 'w-6 lg:w-8 h-6 lg:h-8 rounded-full mr-1'
          }
        />
      </button>
      <div
        className={
          owner
            ? 'w-3/5 p-2 rounded-tl-xl rounded-b-xl bg-test text-white bg-tweetOwner'
            : 'w-3/5 p-2 rounded-tr-xl rounded-b-xl bg-tweetParticipant'
        }
      >
        <div className="flex justify-between text-[9px]">
          <p className={owner ? 'order-1' : ''}>{username}</p>
          <p>{formatAgo(createdAt)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">{text}</p>
          {owner && (
            <button
              onClick={() => onDelete(id)}
              className="hover:scale-105 hover:rotate-17 hover:text-black transition-all delay-150 duration-300 ease-in-out"
            >
              <RiDeleteBin6Line />
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

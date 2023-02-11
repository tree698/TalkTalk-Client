import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import { useQuery } from '@tanstack/react-query';
import Avatar from './Avatar';

export default function UsersInConversation({ onAvatarClick }) {
  const { tweetService } = useApiContext();
  const {
    state: { id },
  } = useLocation();

  const { isLoading, error, data } = useQuery(['usersInConversation'], () =>
    tweetService.getTweets('', id).then((data) => removeDuplicatedUser(data))
  );

  const STYLE_FOR_AVATAR = 'w-12 h-12 rounded-full mr-2';

  return (
    <section className="flex items-center px-3">
      <span className="w-12 h-12 text-center text-3xl border-2 border-darkGray p-1 rounded-full mr-4">
        {calculateLength(data)}
      </span>
      <ul>
        {data &&
          data.map((user) => (
            <button key={user.id} onClick={() => onAvatarClick(user.username)}>
              <Avatar
                photo={user.photo}
                username={user.username}
                styleForAvatar={STYLE_FOR_AVATAR}
              />
            </button>
          ))}
      </ul>
    </section>
  );
}

function removeDuplicatedUser(array) {
  const photo = [];
  const result = [];
  array.forEach((a) => {
    if (photo.includes(a.photo)) {
      return;
    }
    photo.push(a.photo);
    result.push({ id: a.id, photo: a.photo, username: a.username });
  });
  return result;
}

function calculateLength(data) {
  let result = 0;
  data.forEach((a) => (result += 1));
  return result;
}

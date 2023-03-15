import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import { useQuery } from '@tanstack/react-query';
import Avatar from './Avatar';

export default function UsersInConversation({ onAvatarClick }) {
  const STYLE_FOR_AVATAR =
    'w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mr-1 md:mr-2 lg:mr-3 rounded-full ';

  const [length, setLength] = useState();
  const { tweetService } = useApiContext();
  const {
    state: { id },
  } = useLocation();

  const { error, data } = useQuery(
    ['usersInConversation'],
    () =>
      tweetService.getTweets('', id).then((data) => {
        const result = removeDuplicatedUser(data);
        setLength((prev) => result.length);
        return result;
      }),
    {
      enabled: !!'userInConversation',
      refetchInterval: 1000,
    }
  );

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <section className="flex items-center">
      <span className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-sm md:text-base lg:text-lg text-center mr-1 md:mr-2 lg:mr-3 border border-darkGray rounded-full">
        {length}
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

export function removeDuplicatedUser(array) {
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

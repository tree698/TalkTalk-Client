import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import { useQuery } from '@tanstack/react-query';
import Avatar from './Avatar';

export default function UsersInConversation({ onAvatarClick }) {
  const STYLE_FOR_AVATAR =
    'w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 mr-1 md:mr-2 rounded-full ';
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
    <section className="flex items-center px-1 md:px-2 lg:px-3">
      <span className="w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 text-xl md:text-2xl lg:text-3xl mr-2 md:mr-3 lg:mr-4 lg:p-1 text-center border-2 border-darkGray rounded-full">
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

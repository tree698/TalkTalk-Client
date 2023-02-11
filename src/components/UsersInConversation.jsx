import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import Avatar from './Avatar';
import toast from 'react-hot-toast';

export default function UsersInConversation({ onAvatarClick }) {
  const [userInfo, setUserInfo] = useState([]);
  const [error, setError] = useState('');

  const { tweetService } = useApiContext();
  const {
    state: { id },
  } = useLocation();

  useEffect(() => {
    tweetService
      .getTweets('', id)
      .then((tweets) => {
        const removeDuplicate = removeDuplicatedUser(tweets);
        setUserInfo((prev) => [...removeDuplicate]);
      })
      .catch((error) => {
        setError((prev) => error.toString());
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }, [id, tweetService]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const STYLE_FOR_AVATAR = 'w-12 h-12 rounded-full mr-2';

  return (
    <section className="flex items-center px-3">
      <span className="w-12 h-12 text-center text-3xl border-2 border-darkGray p-1 rounded-full mr-4">
        {userInfo.length}
      </span>
      <ul>
        {userInfo &&
          userInfo.map((user) => (
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

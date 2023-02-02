import React from 'react';
import { BsGithub } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer>
      <div>
        <address>
          <a href="mailto:tree698@gmail.com">tree698@gmail.com</a>
        </address>
        <a
          href="https://github.com/tree698/TalkTalk-Client"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub />
        </a>
      </div>
      <p>Thisis Chanwoo's portfolio.</p>
      <p>2023 Chanwoo @All Right Reserved</p>
    </footer>
  );
}

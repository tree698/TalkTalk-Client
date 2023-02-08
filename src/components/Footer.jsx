import React from 'react';
import { BsGithub } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="ml-3 mb-3">
      <div className="flex items-center">
        <address>
          <a
            className="hover:text-brand hover:scale-105 transition-all delay-150 duration-300 ease-in-out"
            href="mailto:tree698@gmail.com"
          >
            tree698@gmail.com
          </a>
        </address>
        <a
          href="https://github.com/tree698/TalkTalk-Client"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub className="ml-3 text-2xl hover:rotate-17 hover:scale-110 hover:hover:text-brand transition-all delay-150 duration-300 ease-in-out hover:shadow-xl" />
        </a>
      </div>
      <p>Chanwoo's portfolio@All Right Reserved</p>
    </footer>
  );
}

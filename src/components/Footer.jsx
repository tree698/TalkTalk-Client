import React from 'react';
import { BsGithub } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center text-2xl border-t-2 border-gray-300 p-4">
      <div className="flex items-center mb-1">
        <address className="mr-4">
          <a className="hover:hover:text-brand" href="mailto:tree698@gmail.com">
            tree698@gmail.com
          </a>
        </address>
        <a
          href="https://github.com/tree698/TalkTalk-Client"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub className="text-4xl hover:rotate-17 hover:text-brand hover:scale-110" />
        </a>
      </div>
      {/* <p>Thisis Chanwoo's portfolio.</p> */}
      <p>2023 Chanwoo @All Right Reserved</p>
    </footer>
  );
}

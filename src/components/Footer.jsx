import React from 'react';
import { BsGithub } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className=" pb-1 md:pb-2 lg:pb-3 pl-1 md:pl-2 lg:pl-3 text-[10px] md:text-xs lg:text-sm">
      <div className="flex items-center justify-start">
        <a
          className="hover:text-brand hover:scale-105 transition-all delay-150 duration-300 ease-in-out"
          href="mailto:tree698@gmail.com"
        >
          tree698@gmail.com
        </a>
        <a
          href="https://github.com/tree698/TalkTalk-Client"
          rel="noreferrer"
          target="_blank"
        >
          <BsGithub className="text-base md:text-lg lg:text-xl ml-1 md:ml-2 lg:ml-3 hover:rotate-17 hover:shadow-md hover:scale-105 hover:hover:text-brand transition-all delay-150 duration-300 ease-in-out" />
        </a>
      </div>
      <p>Chanwoo's portfolio@All Right Reserved</p>
    </footer>
  );
}

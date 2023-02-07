import React from 'react';
import { BsGithub } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="fixed bottom-3 left-3 flex flex-col text-sm md:text-sm lg:text-base">
      <div className="flex items-center">
        <address className="mr-4">
          <a
            className="hover:text-slate-500 transition-all ease-in delay-200"
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
          <BsGithub className="text-2xl hover:rotate-17 hover:scale-110 hover:hover:text-brand transition-all ease-in delay-200" />
        </a>
      </div>
      <p>Chanwoo's portfolio@All Right Reserved</p>
    </footer>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';
import Search from './Search';

export default function ActionBtn() {
  const linkStyle =
    'w-[330px] md:w-[260px] text-xl text-center py-3 border border-superLightGray rounded-md shadow-inner hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out';
  return (
    <section className="pt-[130px] flex flex-col gap-y-2 md:gap-y-0 md:flex-row max-w-4xl mx-auto md:my-14 gap-x-5">
      <Link to="/home/alldrawings" className={`${linkStyle}`}>
        <div className="flex items-center">
          <BsChevronRight className="ml-7 mr-5" />
          <p>All Drawings</p>
        </div>
      </Link>
      <Link to="/home/mydrawings" className={`${linkStyle}`}>
        <div className="flex items-center">
          <BsChevronRight className="ml-7 mr-5" />
          <p>My Drawings</p>
        </div>
      </Link>
      <Search />
    </section>
  );
}

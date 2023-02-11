import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { BsChevronRight } from 'react-icons/bs';

export default function ActionBtn() {
  const linkStyle =
    'w-[260px] text-xl text-center py-3 border border-superLightGray rounded-md shadow-inner hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out';
  return (
    <section className="pt-[104px] flex max-w-4xl mx-auto mt-14 mb-8 gap-x-5">
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

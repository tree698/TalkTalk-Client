import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';
import Search from './Search';

export default function ActionBtn() {
  const LINK_STYLE =
    'text-xs md:text-sm lg:text-base text-center py-1 md:py-2 border border-superLightGray rounded-md shadow-inner hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out';
  return (
    <section className="pt-[100px] md:pt-[120px] lg:pt-[140px] px-20 md:px-8 grid grid-rows-3 gap-y-1 md:grid md:grid-cols-3 md:grid-rows-1 md:gap-x-3">
      <Link to="/home/alldrawings" className={`${LINK_STYLE}`}>
        <div className="flex items-center justify-center md:justify-start">
          <BsChevronRight className="ml-5 mr-2 md:mr-3 lg:mr-4" />
          <p>All Drawings</p>
        </div>
      </Link>
      <Link to="/home/mydrawings" className={`${LINK_STYLE}`}>
        <div className="flex items-center justify-center md:justify-start">
          <BsChevronRight className="ml-5 mr-2 md:mr-3 lg:mr-4" />
          <p>My Drawings</p>
        </div>
      </Link>
      <Search />
    </section>
  );
}

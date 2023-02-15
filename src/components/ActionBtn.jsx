import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';
import Search from './Search';

export default function ActionBtn() {
  const LINK_STYLE =
    'w-[260px] text-base md:text-lg lg:text-xl text-center py-1 md:py-2 lg:py-3 border border-superLightGray rounded-md shadow-inner hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out';
  return (
    <section className="pt-[80px] md:pt-[100px] lg:pt-[130px] flex flex-col gap-y-2 md:gap-y-0 md:flex-row max-w-4xl mx-auto md:my-14 gap-x-5">
      <Link to="/home/alldrawings" className={`${LINK_STYLE}`}>
        <div className="flex items-center">
          <BsChevronRight className="ml-7 mr-2 md:mr-3 lg:mr-5" />
          <p>All Drawings</p>
        </div>
      </Link>
      <Link to="/home/mydrawings" className={`${LINK_STYLE}`}>
        <div className="flex items-center">
          <BsChevronRight className="ml-7 mr-2 md:mr-3 lg:mr-5" />
          <p>My Drawings</p>
        </div>
      </Link>
      <Search />
    </section>
  );
}

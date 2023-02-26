import React from 'react';
import { BsCheckLg } from 'react-icons/bs';
import Banner from './ui/Banner';

export default function ViewMore({ lengthDrawings, limit, onButtonClick }) {
  return (
    <div>
      {lengthDrawings === limit ? (
        <button
          onClick={() => onButtonClick()}
          className="w-52 md:w-56 lg:w-60 py-1 md:py-2 lg:py-3 my-6 md:my-8 lg:my-10  text-xs md:text-sm lg:text-base font-semibold text-center text-white bg-brand rounded-3xl hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out"
        >
          View More
        </button>
      ) : (
        <div className="flex items-center gap-1 md:gap-2 lg:gap-3 my-6 md:my-8 lg:my-10 text-xs md:text-sm lg:text-base">
          <BsCheckLg />
          <Banner text="No more drawings" />
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { BsCheckLg } from 'react-icons/bs';
import Banner from './ui/Banner';

export default function ViewMore({ lengthDrawings, limit, onButtonClick }) {
  return (
    <div>
      {lengthDrawings === limit ? (
        <button
          onClick={() => onButtonClick()}
          className="w-[200px] md:w-[400px] py-1 md:py-2 lg:py-3 px-2 mt-8 md:mt-10 lg:mt-12 mb-8 text-xl font-semibold text-center text-white bg-accent rounded-2xl hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out"
        >
          View More
        </button>
      ) : (
        <div className="flex items-center gap-4 mt-12 text-2xl">
          <BsCheckLg />
          <Banner text="No more drawings" />
        </div>
      )}
    </div>
  );
}

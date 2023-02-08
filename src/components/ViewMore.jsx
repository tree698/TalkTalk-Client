import React from 'react';
import Banner from './ui/Banner';

export default function ViewMore({ lengthDrawings, limit, onButtonClick }) {
  return (
    <div>
      {lengthDrawings === limit ? (
        <button
          onClick={() => onButtonClick()}
          className="w-[400px] py-3 px-2 my-8 text-xl font-semibold text-center text-white bg-accent rounded-2xl hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out"
        >
          View More
        </button>
      ) : (
        <Banner text="No more drawings" />
      )}
    </div>
  );
}

import React from 'react';
import ImageSlide from './ImageSlide';

export default function Heading() {
  return (
    <section className="w-full basis-3/5 flex flex-col justify-center border-2 border-gray-300">
      <div className="flx flx-col items-center">
        <img src="image/logo.png" alt="logo" className="w-1/4 mx-auto" />
        {/* <img
          src="image/slogan.png"
          alt="slogan"
          className="w-px-300 mx-auto my-10"
        /> */}
        <h2 className="text-5xl font-bold my-12 text-center text-gray-700">
          Upload your drawing, then enjoy talking
        </h2>
        <ImageSlide />
      </div>
    </section>
  );
}

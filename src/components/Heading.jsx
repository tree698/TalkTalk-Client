import React from 'react';
import ImageSlide from './ImageSlide';

export default function Heading() {
  return (
    <section className="basis-1/2 lg:basis-3/5 w-full flex flex-col justify-center items-center bg-cover bg-headingBG  md:mx-2 lg:mx-0">
      <img
        src="images/logo.png"
        alt="logo"
        className="w-[30%] md:w-[40%] lg:w-1/2"
      />
      <h2 className="text-xs md:text-sm lg:text-base mb-4 md:mb-6 lg:mb-8">
        Upload drawing, then enjoy talking
      </h2>
      <ImageSlide />
    </section>
  );
}

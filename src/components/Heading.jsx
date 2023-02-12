import React from 'react';
import ImageSlide from './ImageSlide';

export default function Heading() {
  return (
    <section className="w-full basis-1/2 bg-cover bg-headingBG lg:basis-3/5 flex flex-col justify-center p-4 pt-10">
      <img
        src="images/logo.png"
        alt="logo"
        className="w-1/2 mx-auto md:w-[360px] lg:w-[400px]"
      />
      <h2 className="text-base text-center md:text-2xl lg:text-3xl my-3 md:my-6 lg:my-9">
        Upload drawing, then enjoy talking
      </h2>
      <ImageSlide />
    </section>
  );
}

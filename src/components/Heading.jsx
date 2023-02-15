import React from 'react';
import ImageSlide from './ImageSlide';

export default function Heading() {
  return (
    <section className="basis-1/2 md:basis-1/2 lg:basis-3/5 w-full flex flex-col justify-center p-4 pt-10 bg-cover bg-headingBG  ">
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

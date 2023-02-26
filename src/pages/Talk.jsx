import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SelectedDrawing from '../components/SelectedDrawing';
import SelectedTweet from '../components/SelectedTweet';

export default function Talk() {
  return (
    <section className="w-full h-full flex flex-col">
      <div className="w-full fixed top-0 left-0 bg-white">
        <Navbar />
      </div>
      <div className="flex flex-col lg:flex-row flex-1 w-full lg:max-w-5xl my-6 md:my-8 lg:my-10 mx-auto pt-[66px]">
        <SelectedDrawing />
        <SelectedTweet />
      </div>
      <Footer />
    </section>
  );
}

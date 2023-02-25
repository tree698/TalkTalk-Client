import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SelectedDrawing from '../components/SelectedDrawing';
import SelectedTweet from '../components/SelectedTweet';

export default function Talk() {
  return (
    <section className="w-full h-screen flex flex-col">
      <Navbar />
      <div className="mt-6 md:mt-8 lg:mt-10 mb-2 md:mb-4 w-full max-w-[1400px] flex flex-col md:flex-row items-center mx-auto flex-1">
        <SelectedDrawing />
        <SelectedTweet />
      </div>
      <Footer />
    </section>
  );
}

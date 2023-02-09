import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SelectedDrawing from '../components/SelectedDrawing';
import SelectedTweet from '../components/SelectedTweet';

export default function Talk() {
  return (
    <section className="w-full h-full flex flex-col">
      <Navbar />
      <div className="w-full max-w-6xl flex flex-1 mx-auto mt-10 mb-4 border-2">
        <SelectedDrawing />
        <SelectedTweet />
      </div>
      <Footer />
    </section>
  );
}

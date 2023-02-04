import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SelectedDrawing from '../components/SelectedDrawing';
import SelectedTweet from '../components/SelectedTweet';

export default function Talk() {
  return (
    <>
      <Navbar />
      <div>
        <SelectedDrawing />
        <SelectedTweet />
      </div>
      <Footer />
    </>
  );
}

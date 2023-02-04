import React from 'react';
import Footer from './Footer';
import ImageSlide from './DrawingSlide';

export default function Heading() {
  return (
    <div>
      <div>
        <img src="logo.png" alt="logo" />
        <h1>TalkTalk</h1>
        <h3>Have Fun Talking With Others With Your Paintings</h3>
      </div>
      <ImageSlide />
      <Footer />
    </div>
  );
}

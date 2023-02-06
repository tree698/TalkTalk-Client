import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Heading from '../components/Heading';

export default function Landing() {
  return (
    <section className="flex flex-col md:h-screen">
      <div className="flex flex-col md:flex-row md:h-full">
        <Heading />
        <Outlet />
      </div>
      <Footer />
    </section>
  );
}

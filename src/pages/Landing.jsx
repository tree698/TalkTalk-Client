import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Heading from '../components/Heading';

export default function Landing() {
  return (
    <section className="w-full h-screen flex flex-col md:flex-row">
      <Heading />
      <Outlet />
      <div className="md:fixed md:bottom-1 md:left-1 text-[10px] md:text-xs lg:text-sm">
        <Footer />
      </div>
    </section>
  );
}

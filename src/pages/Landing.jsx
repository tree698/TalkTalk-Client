import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Heading from '../components/Heading';

export default function Landing() {
  return (
    <section className="w-full h-screen flex flex-col md:flex-row">
      <Heading />
      <Outlet />
      <div className="md:fixed md:bottom-3 md:left-3 text-sm lg:text-base flex flex-col">
        <Footer />
      </div>
    </section>
  );
}

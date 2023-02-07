import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Heading from '../components/Heading';

export default function Landing() {
  return (
    <section className="w-full h-screen flex flex-col md:flex-row">
      <Heading />
      <Outlet />
      <Footer />
    </section>
  );
}

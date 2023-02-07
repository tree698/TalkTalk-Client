import React from 'react';
import { Outlet } from 'react-router-dom';
import Heading from '../components/Heading';

export default function Landing() {
  return (
    <section className="w-full flex flex-col md:flex-row md:h-screen">
      <Heading />
      <Outlet />
    </section>
  );
}

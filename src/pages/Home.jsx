import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ActionBtn from '../components/ActionBtn';

export default function Home() {
  return (
    <section>
      <div className="w-full fixed top-0 left-0 bg-white">
        <Navbar />
      </div>
      <div className="w-full h-full md:max-w-3xl lg:max-w-4xl mx-auto">
        <ActionBtn />
        <Outlet />
      </div>
      <Footer />
    </section>
  );
}

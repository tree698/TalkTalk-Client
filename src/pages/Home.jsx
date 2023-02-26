import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ActionBtn from '../components/ActionBtn';

export default function Home() {
  return (
    <section className="flex flex-col h-full">
      <div className="w-full fixed top-0 left-0 bg-white">
        <Navbar />
      </div>
      <div className="w-full flex-1 md:max-w-3xl lg:max-w-4xl mx-auto">
        <ActionBtn />
        <Outlet />
      </div>
      <Footer />
    </section>
  );
}

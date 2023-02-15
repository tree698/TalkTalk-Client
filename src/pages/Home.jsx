import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ActionBtn from '../components/ActionBtn';

export default function Home() {
  return (
    <section className="w-full h-full flex flex-col">
      <div className="w-full fixed top-0 left-0 bg-white">
        <Navbar />
      </div>
      <ActionBtn />
      <Outlet />
      <Footer />
    </section>
  );
}

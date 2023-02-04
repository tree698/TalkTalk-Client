import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ActionBtn from '../components/ActionBtn';

export default function Home() {
  return (
    <>
      <Navbar />
      <ActionBtn />
      <Outlet />
      <Footer />
    </>
  );
}

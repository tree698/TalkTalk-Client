import React from 'react';
import { Outlet } from 'react-router-dom';
import Heading from '../components/Heading';

export default function Landing() {
  return (
    <>
      <Heading />
      <Outlet />
    </>
  );
}

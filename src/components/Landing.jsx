import React from 'react';
import { Outlet } from 'react-router-dom';
import Heading from './Heading';

export default function Landing() {
  return (
    <>
      <Heading />
      <Outlet />
    </>
  );
}

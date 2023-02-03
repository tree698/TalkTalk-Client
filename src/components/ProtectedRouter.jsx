import React, { useEffect } from 'react';
import { useApiContext } from '../context/ApiContext';
import { Navigate } from 'react-router-dom';

export function ProtectedHome({ children }) {
  const { user } = useApiContext();
  console.log(user);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export function ProtectedLanding({ children }) {
  const { user } = useApiContext();
  if (user) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';

export function ProtectedRouter({ children }) {
  const { user } = useApiContext();

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export function ProtectGoToLandingWithUser({ children }) {
  const { user } = useApiContext();
  if (user) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

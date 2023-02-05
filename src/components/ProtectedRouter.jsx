import React from 'react';
import { useApiContext } from '../context/ApiContext';
import { Navigate } from 'react-router-dom';

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

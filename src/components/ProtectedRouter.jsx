import React from 'react';
import { useApiContext } from '../context/ApiContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter({ children }) {
  const { user } = useApiContext();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

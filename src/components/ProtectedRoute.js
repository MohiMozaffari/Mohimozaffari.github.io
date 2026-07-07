import React from 'react';
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn } from '../api/auth';

const ProtectedRoute = ({ children }) => {
  if (!getIsLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;

// src/components/ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { userInfo } = useSelector((state) => state.user);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !userInfo.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;


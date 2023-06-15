import React from 'react';
import {  Navigate,Outlet } from 'react-router-dom';
import { isAuth } from './helpers';

const PrivateRoute = () => {
    return isAuth() ? <Outlet /> : <Navigate to="/" />;
  };

export default PrivateRoute;
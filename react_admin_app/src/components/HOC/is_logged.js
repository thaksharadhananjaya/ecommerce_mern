import React from 'react'
import { Navigate } from 'react-router-dom'



const IsNotLogged = ({ children }) => {

  const token = window.localStorage.getItem('token');

  return !token ? children : <Navigate replace to='/' />;
}

export default IsNotLogged;

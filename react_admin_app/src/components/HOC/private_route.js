import React from 'react'
import { Navigate } from 'react-router-dom';
import axiosInstance from '../../helpers/axios';

/* const PrivateRoute = ({ component: Component, ...rest }) =>{
  return (<Route {...rest} element={(props) => {
    const token = window.length.getItem('token');
    console.log(token);
    if(token){
      return <Component {...props}/>;
    }else{
      return <Navigate replace to='/signin' />;
    }

  }} />);
} */

/* const isValidToken = async ()=>{
  return await axiosInstance.get('user');
} */


const PrivateRoute = ({ children }) => {

  const token = window.localStorage.getItem('token');
  //const response = isValidToken();

  return token ? children : <Navigate replace to='/signin' />;
}

export default PrivateRoute;

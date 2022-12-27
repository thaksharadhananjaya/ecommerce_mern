import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Signin from './pages/signin/signin';
import PrivateRoute from './components/HOC/private_route';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions/auth_actions';
import Products from './pages/products/product';
import Categories from './pages/categories/categories';
import Orders from './pages/orders/orders';


function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate)
      dispatch(isUserLoggedIn());
  }, []);


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>} />
          <Route path="/categories" exact element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>} />
          <Route path="/products" exact element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>} />
          <Route path="/orders" exact element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

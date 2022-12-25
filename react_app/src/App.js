import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Signin from './pages/signin/signin';
import PrivateRoute from './components/HOC/private_route';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

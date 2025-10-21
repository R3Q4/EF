import React from "react";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

import './App.css';

import Signin from './pages/auth/signin'
import Signup from './pages/auth/signup'
import Homepage from './pages/information/homepage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>


      </Routes>
    </Router>
  );
}

export default App;

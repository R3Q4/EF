import React from "react";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

import './App.css';

import Signin from './pages/auth/signin'
import Signup from './pages/auth/signup'
import Home from './pages/information/home'
import About from './pages/information/about'
import Chatbot from './pages/chatbot/chatbot'
import Enquiry from './pages/feedbackEnquiry/feedbackEnquiry'
import Data from './pages/data'
import Find from './pages/find'
import SFind from './pages/Sfind'

import TEST from './pages/datasets/map'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SFind />}/>
        <Route path="/home" element={<Home />}/>

        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/chatbot" element={<Chatbot />}/>
        <Route path="/enquiry" element={<Enquiry />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/find" element={<Find />}/>
        <Route path="/Sfind" element={<SFind />}/>

      </Routes>
    </Router>
  );
}

export default App;

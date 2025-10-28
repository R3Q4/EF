import React from "react";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

import './App.css';

import Signin from './pages/auth/signin'
import Signup from './pages/auth/signup'
import Home from './pages/information/home'
import About from './pages/information/about'
import Chatbot from './pages/chatbot/chatbot'
import Enquiry from './pages/feedbackEnquiry/feedbackEnquiry'
import Data from './pages/datasets/data'
import Find from './pages/datasets/find'
import SFind from './pages/Sfind'
import Profile from './pages/profile/profile'
import ViewEnquiry from './pages/feedbackEnquiry/viewEnquiry'
import Nearest from './pages/datasets/nearest'
import Share from './pages/share/share'
import TEST from './pages/share/test'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Share />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/find" element={<Find />}/>

        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/chatbot" element={<Chatbot />}/>
        <Route path="/enquiry" element={<Enquiry />}/>
        <Route path="/viewEnquiry" element={<ViewEnquiry />}/>

        <Route path="/about" element={<About />}/>
        <Route path="/find" element={<Find />}/>
        <Route path="/Sfind" element={<SFind />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/nearest" element={<Nearest />}/>
        <Route path="/share" element={<Share />}/>



      </Routes>
    </Router>
  );
}

export default App;

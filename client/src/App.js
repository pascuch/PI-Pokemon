import './App.css';

import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx'

export default function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/home' element={<Home />} />
      </Routes>
    </React.Fragment>
  );
}


import './App.css';

import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx'
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import Detail from './components/Detail/Detail';

export default function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/home' element={<Home />} />
        <Route path='/create' element={<CreatePokemon />} />
        <Route path='/pokemon/:id' element={<Detail />} />
      </Routes>
    </React.Fragment>
  );
}


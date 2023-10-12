import React from 'react';
import {  Route, Routes } from 'react-router-dom';

//import Header from './navigation/Header';
import Home from './navigation/Home';

function App() {
  return (
    <Routes>
    <Route path='/' element={<Home />} />
  </Routes>
  );
}

export default App;

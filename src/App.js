import React ,{Fragment} from 'react';
import {  Route, Routes } from 'react-router-dom';

import Header from './navigation/Header';
import Home from './navigation/Home';
import MailBox from './MailBox/MailBox';

function App() {
  return (
    <Fragment>
    <Header />   

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/mailbox' element={<MailBox />} />
    </Routes>
  </Fragment>
  );
}

export default App;

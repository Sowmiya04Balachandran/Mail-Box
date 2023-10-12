import { Fragment } from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './navigation/Home';
import Header from './navigation/Header';
import Inbox from './MailBox/Inbox';
import Sent from './MailBox/Sent';
import ComposeEmailForm from './MailBox/ComposeEmailForm';

function App() {
  return (
    <Fragment>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/inbox' element={<Inbox />} />
        <Route path='/sent' element={<Sent />} />
        <Route path='/composeemail' element={<ComposeEmailForm />} />
      </Routes>
    </Fragment>

  );
}
export default App;
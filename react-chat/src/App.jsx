import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Messenger from './pages/messenger';
import Chat from './pages/chat';
import ProfilePage from './pages/profile-page'
import AuthPage from './pages/auth-page'

import './App.css';


function App() {
  return (
    <HashRouter>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Messenger />} />
          <Route path='/chat/:id' element={<Chat />} />
          <Route path='/profile-page' element={<ProfilePage />} />
          <Route path='/auth' element={<AuthPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;



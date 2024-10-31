import React, { useState } from 'react';

import Messenger from './pages/messenger';
import Chat from './pages/chat';

import './App.css';


function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleUserSelect = (user) => {
    setCurrentUser(user);
  }

  return (
    <div className='app'>
      {!currentUser ? (
        <Messenger onUserSelect={handleUserSelect}/>
      ) : (
        <Chat _current_user={[currentUser, handleUserSelect]}/>
      )}
    </div>
  );
}

export default App;



import React, { useState } from 'react'

import Messanger from './pages/Messanger'
import Chat from './pages/Chat'

import './App.css'


function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleUserSelect = (user) => {
    setCurrentUser(user);
  }

  return (
    <div className='app'>
      {!currentUser ? (
        <Messanger onUserSelect={handleUserSelect}/>
      ) : (
        <Chat _current_user={[currentUser, handleUserSelect]}/>
      )}
    </div>
  );
}

export default App;



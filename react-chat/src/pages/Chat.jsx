import React, { useState, useEffect, useRef } from 'react'

import backButtonLogo from '/backButton.svg'
import menuButtonLogo from '/menuButton.svg'
import profileLinkLogo from '/profileLink.svg'
import searchButtonLogo from '/searchButton.svg'
import attachButtonLogo from '/attachButton.svg'
import sendButtonLogo from '/sendButton.svg'

import './Chat.css'

function Chat({_current_user}) {
  //Обработчик пользователя
  const current_user = _current_user[0];
  const user_handler = _current_user[1];

  const [user, setUser] = useState(current_user);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const userFromUrl = urlParams.get('user');
    // setUser(userFromUrl);

    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(storedMessages.filter(message =>
      message.sender === user || (message.sender === 'You' && message.whom === user)
    ));

  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      loadMessage();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    }
  }, [user]);

  const loadMessage = () => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(storedMessages.filter(message =>
      message.sender === user || (message.sender === 'You' && message.whom === user)
    ));
  };

  const displayMessage = (message, index) => (
    <div className={`message ${message.sender === 'You' ? 'you' : 'opponent'}`} key={index}>
      <strong className='message-text'>{message.sender}</strong> <small className='message-text'>{message.time}</small>
      <p className='message-text'>{message.text}</p>
    </div>
  );

  const saveMessage = (message) => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    storedMessages.push(message);
    localStorage.setItem('messages', JSON.stringify(storedMessages));
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const sendMessageHandler = () => {
    if (!input.trim()) return;

    const message = {
      sender: 'You',
      text: input,
      time: new Date().toLocaleTimeString(),
      lastMessage: input,
      whom: user,
    };

    saveMessage(message);
    setInput('');

    const chatInfo = {
      lastMessage: input,
      time: new Date().toLocaleTimeString(),
      whom: user,
      isReaded: false,
    };

    localStorage.setItem(user, JSON.stringify(chatInfo));

    setTimeout(() => {
      const reply = {
        sender: user,
        text: 'I do not understand you(',
        time: new Date().toLocaleTimeString(),
        lastMessage: 'I do not understand you(',
        whom: user,
      };
      saveMessage(reply);
      localStorage.setItem(user, JSON.stringify(reply));
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessageHandler();
  };

  return (
    <div>

      <header className='header'>

        <a href='#1' onClick={() => {user_handler(null)}} className='back-button'>
          <img src={backButtonLogo}/>
        </a>

        <a href='#2' className='profile-link'>
          <img src={profileLinkLogo}/>
        </a>

        <div className='user-info'>
          <h3>{user || 'User'}</h3>
          <p>last seen 2 hours ago</p>
        </div>

        <div className='right-icons'>
          <button className='search-icon'>
            <img src={searchButtonLogo}/>
          </button>
          <button className='menu-icon'>
            <img src={menuButtonLogo}/>
          </button>
        </div>

      </header>

      <div className='chat-container' ref={chatContainerRef}>
        {messages.map((message, index) => displayMessage(message, index))}
      </div>

      <form className='form' onSubmit={handleSubmit}>
        <input
          className='form-input'
          name='message-text'
          placeholder='Write a message...'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='send-button' onClick={sendMessageHandler}>
          <img src={sendButtonLogo}/>
        </button>
        <button className='attach-button'>
          <img src={attachButtonLogo}/>
        </button>
      </form>

    </div>
  );
}

export default Chat
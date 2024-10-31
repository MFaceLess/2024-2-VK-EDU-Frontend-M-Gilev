import React, { useState } from 'react';

import sendButtonLogo from '/sendButton.svg'
import attachButtonLogo from '/attachButton.svg'

import './index.css'

export const ChatSendMessageForm = ({user, setMessages}) => {
    const [input, setInput] = useState('');

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
        <form className='form' onSubmit={handleSubmit}>
            <input
            className='form-input'
            name='message-text'
            placeholder='Write a message...'
            autoComplete='off'
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
    );
};

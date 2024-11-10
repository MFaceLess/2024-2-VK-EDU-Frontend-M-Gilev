import React, { useState, useRef } from 'react';

import sendButtonLogo from '/sendButton.svg'
import attachButtonLogo from '/attachButton.svg'

import './index.css'

export const ChatSendMessageForm = ({ setMessages, id }) => {
    const [input, setInput] = useState('');
    const messagesRef = useRef([]);

    const addNewMessages = (newMessages) => {
      messagesRef.current = [...messagesRef.current, ...newMessages];
      setMessages((prev) => [...prev, ...newMessages]);
    }

    const updateMes = async () => {
      const chat = id;
      const page_size = 150;
      const params = new URLSearchParams({ chat, page_size });
      try {
        const response = await fetch(`/api/messages/?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) throw new Error('Ошибка при получении сообщений');
        const data = await response.json();
        const mesElem = data.results.reverse().map((message) => ({
          'sender': message.sender.first_name + ' ' + message.sender.last_name,
          'time': new Date(message.created_at).toLocaleString(),
          'text': message.text,
          'id': message.id,
          'senderId': message.sender.id,
        }));
        addNewMessages(mesElem);
        // setMessages((prevMes) => [...prevMes, ... mesElem]);
      } catch (error) {
        alert(error);
        navigate('/auth');
      }
    }
    
    const sendMessageHandler = async () => {
      if (!input.trim()) return;
      try {
        const response = await fetch('/api/messages/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'text': input,
            'chat': id,
          }),
        });
        if (!response.ok) throw new Error('Ошибка при посылке сообщения');
        const data = await response.json();
        await updateMes();
        console.log(data);
      } catch (error) {
        alert(error);
        navigate('/auth');
      }
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

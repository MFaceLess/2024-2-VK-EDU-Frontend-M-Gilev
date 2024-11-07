import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Centrifuge } from 'centrifuge'

import profileLinkLogo from '/profileLink.svg';

import './index.css'

export const Chats = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  const accessToken = localStorage.getItem('access');

  const fetchChats = async ({ page_size = 10, page = 1 }) => {
    const params = new URLSearchParams({ page_size, page });
    try {
      const response = await fetch(`/api/chats/?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Ошибка при получении списка чатов');
      const data = await response.json();
      console.log(data);
      setMessages(data.results);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  useEffect(() => {
    fetchChats({ page_size: 100, page: 1 });
  }, []);

  return (
    <div className='messages'>
      {messages.map((msg, index) => (
        <Link to={`/chat/${msg.id}`} state={{ friend: msg.members.find(member => member.id !== localStorage.getItem('uuid'))}} className='message-link' key={index}>
          <div className='user-beep'>
            <img className='user-avatar' src={msg.avatar || profileLinkLogo}/>
            <div className='user-details'>
              <div className='top-container'>
                <strong className='user'>{msg.title}</strong> <small className='time-text'>{new Date(msg.updated_at).toLocaleString()}</small>
              </div>
              <small className='message-text'>{msg.last_message?.text || 'Нет сообщений'}</small>
            </div>
          </div>
          <div className='badge'>{msg.badge}</div>
        </Link>
      ))}
    </div>
  );
};

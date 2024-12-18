import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ConvertDateToString } from '../../entityes/utils/convertDateToString';
import { fetchWithAuth } from '../../entityes/API/auth/fetchWithRefresh';
import { toast } from 'react-toastify';

import profileLinkLogo from '/profileLink.svg';

import './index.css'
import { useSelector } from 'react-redux';
import { LazyImage } from '../lazy-image';

export const Chats = () => {
  const navigate = useNavigate();
  const [messages, setChats] = useState([]);
  const [contextMenu, setContextMenu] = useState({  visible: false, x: 0, y: 0, chatId: null})

  const accessToken = localStorage.getItem('access');

  const safeFetch = React.useMemo(() => {
    return fetchWithAuth(globalThis.fetch, navigate);
  }, [navigate])

  const fetchChatsFromApi = async ({ page_size = 10, page = 1 }) => {
    const params = new URLSearchParams({ page_size, page });
    try {
      const response = await safeFetch(`https://vkedu-fullstack-div2.ru/api/chats/?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      // console.log(response);
      // if (!response.ok) throw new Error('Ошибка при получении списка чатов');
      // const data = await response.json();
      setChats(response.results);
    } catch (error) {
      navigate('/auth');
    }
  };

  useEffect(() => {
    fetchChatsFromApi({ page_size: 100, page: 1 });
  }, [])

  const messagesStore = useSelector((state) => state.chat.messages);
  useEffect(() => {
    fetchChatsFromApi({ page_size: 100, page: 1 });
  }, [messagesStore])

  const handleContextMenu = (event, chatId) => {
    event.preventDefault();

    const windowWidth = window.innerWidth;
    const menuWidth = 200;

    let x = event.clientX;
    let y = event.clientY;

    if (x + menuWidth > windowWidth) {
      x = windowWidth - menuWidth;
    }

    setContextMenu({
      visible: true,
      x,
      y,
      chatId,
    });
  };

  const handleCloseMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
  };

  useEffect(() => {
    const clickOutside = (event) => {
      if (!event.target.closest('.context-menu')) {
        setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
      }
    };
  
    const escDown = (event) => {
      if (event.key === 'Escape') {
        setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
      }
    };
  
    document.addEventListener('keydown', escDown);
    document.addEventListener('mousedown', clickOutside);
  
    return () => {
      document.removeEventListener('keydown', escDown);
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  const handleDeleteChat = async (chatId) => {
    try {
      const response = await fetch(`https://vkedu-fullstack-div2.ru/api/chat/${chatId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData?.detail || 'Ошибка при удалении сообщения';
      }
      await fetchChatsFromApi({ page_size: 100, page: 1 });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className='messages'>

        {contextMenu.visible && (
          <div 
            className="context-menu" 
            style={{ top: contextMenu.y, left: contextMenu.x }} 
            onClick={handleCloseMenu}
          >
            <div onClick={() => handleDeleteChat(contextMenu.chatId)}>Удалить чат</div>
          </div>
        )}

      {messages.map((msg, index) => (
        <Link 
          to={`/chat/${msg.id}`} 
          state={{ friend: msg.members ? msg.members.find(member => member.id !== localStorage.getItem('uuid')) : null, 
                   title: msg.title, avatar: msg.avatar, 
                   is_online: msg.members?.find(member => member.id !== localStorage.getItem('uuid'))?.is_online || null,
                   last_online_at: msg.members?.find(member => member.id !== localStorage.getItem('uuid'))?.last_online_at || null,
                   isCommonChat: msg.members.length > 2 ? true : false}}
          className='message-link' 
          key={index}
          onContextMenu={(event) => handleContextMenu(event, msg.id)}
        >
          <div className='user-beep'>
            <div className='user-avatar-container'>
              <LazyImage className='user-avatar' src={msg.avatar || profileLinkLogo}/>
            </div>
            <div className='user-details'>
              <div className='top-container'>
                <strong className='user'>{msg.title}</strong> <small className='time-text'>{ConvertDateToString.convDateToStringFormat((new Date(msg.updated_at).toLocaleString()))}</small>
              </div>
              <small className='message-text_corrected'>
              {msg.last_message ? (
                msg.last_message.text || 
                (msg.last_message.voice ? 'Голосовое сообщение' : 
                  (msg.last_message.files.length !== 0 ? 'Изображения: images' : 'Нет сообщений'))
              ) : 'Нет сообщений'}
              </small>
            </div>
          </div>
          {/* <div className='badge'>{msg.badge}</div> */}
        </Link>
      ))}
    </div>
  );
};

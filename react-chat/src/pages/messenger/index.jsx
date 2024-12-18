import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import startChatButtonLogo from '/startChatButton.svg';

// Импорт компонентов
import { HeaderChatList } from '../../components/header';
import { SideBurgerMenu } from '../../components/burger-side-menu';
import { FriendList } from '../../components/friends-list';
import { Chats } from '../../components/chats';


import './index.css';
import { fetchWithAuth } from '../../entityes/API/auth/fetchWithRefresh';
import { useDispatch } from 'react-redux';
import { setupCentrifugo } from '../../entityes/centrifuge';


const Messenger = () => {
  const navigate = useNavigate();

  const [isBurgerMenuVisible, setBurgerMenuVisible] = useState(false);
  const [isChatSelectionVisible, setChatSelectionVisible] = useState(false);
  const chatContainerRef = useRef(null);
  const modalRef = useRef(null);

  //Обработка закрытия модалки
  useEffect(() => {
    const clickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setChatSelectionVisible(false);
      }
    }

    const escDown = (event) => {
      if (event.key === 'Escape') {
        setChatSelectionVisible(false);
        document.activeElement.blur();
      }
    };

    document.addEventListener('keydown', escDown);
    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('keydown', escDown);
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [setChatSelectionVisible]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatContainerRef])

  const safeFetch = React.useMemo(() => {
    return fetchWithAuth(globalThis.fetch, navigate);
  }, [navigate])

  //Connect к websocket
  const dispatch = useDispatch();
  useEffect(() => {
    const url = 'https://vkedu-fullstack-div2.ru/api/user/current/';
    safeFetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
        }
    })
    .then((data) => {
      if (data) {
        localStorage.setItem('uuid', data.id);
      }
    })

    const timeout = setTimeout(() => {
      dispatch(setupCentrifugo(localStorage.getItem('uuid'), safeFetch, navigate));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [])

  return (

    <>
      <SideBurgerMenu isBurgerMenuVisible={isBurgerMenuVisible} setBurgerMenuVisible={setBurgerMenuVisible}/>
      
      <div className='window'>

        <HeaderChatList setBurgerMenuVisible={setBurgerMenuVisible}/>

        <div className='chat-container' ref={chatContainerRef}>
          <Chats />

          <button className='start-chat-button' onClick={() => setChatSelectionVisible(true)}>
              <img src={startChatButtonLogo}/>
          </button>

          {isChatSelectionVisible && (
            <FriendList modalRef={modalRef} setChatSelectionVisible={setChatSelectionVisible}/>
          )}
        </div>
      </div>
    </>
  );
}

export default Messenger;
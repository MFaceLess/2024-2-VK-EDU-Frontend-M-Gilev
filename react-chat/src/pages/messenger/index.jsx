import React, { useState, useEffect, useRef } from 'react';

import startChatButtonLogo from '/startChatButton.svg';

// Импорт компонентов
import { HeaderChatList } from '../../components/header';
import { SideBurgerMenu } from '../../components/burger-side-menu';
import { FriendList } from '../../components/friends-list';
import { Chats } from '../../components/chats';

import './index.css';

const Messenger = () => {
  const [isBurgerMenuVisible, setBurgerMenuVisible] = useState(false);

  const [isChatSelectionVisible, setChatSelectionVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [friends] = useState([
    {id: 1, name: 'User1'},
    {id: 2, name: 'User2'},
    {id: 3, name: 'User3'},
    {id: 4, name: 'User4'},
    {id: 5, name: 'User5'},
  ]);
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
    friends.forEach(friend => {
      const storedFriendData = localStorage.getItem(friend.name);
      if (storedFriendData) {
        const parsedData = JSON.parse(storedFriendData);
        if (parsedData && parsedData.lastMessage) {
          displayMessages(parsedData);
        }
      }
    });
  }, [friends]);

  const displayMessages = friend => {
    const randomNumber = Math.floor(Math.random() * 100);
    const badge = randomNumber === 0 ? '✔️✔️' : randomNumber;

    const truncatedMessage = friend.lastMessage.length > 50
      ? friend.lastMessage.substring(0, 50) + '...'
      : friend.lastMessage;

    setMessages(prevMessages => [
      ...prevMessages.filter(msg => msg.whom !== friend.whom),
      {
        whom: friend.whom,
        time: friend.time,
        lastMessage: truncatedMessage,
        badge: badge,
        id: friend.id,
      }
    ]);

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const saveMessage = message => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    storedMessages.push(message);
    localStorage.setItem('messages', JSON.stringify(storedMessages));
  };

  const updateChat = friend => {
    displayMessages(friend);
  };

  useEffect(() => {
    setTimeout(() => {
      const chatInfo = {
        lastMessage: 'Does it work?',
        id: 4,
        time: new Date().toLocaleTimeString(),
        whom: 'User4',
        isReaded: false,
      };
      const message = {
        sender: 'User4',
        id: 4,
        text: 'Does it work?',
        time: new Date().toLocaleTimeString(),
        lastMessage: 'Does it work?',
        whom: 'You',
      };
      saveMessage(message);
      localStorage.setItem('User4', JSON.stringify(chatInfo));
      updateChat(chatInfo);
    }, 3000);
    return;
  }, []);

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
import React, { useState, useEffect, useRef } from 'react';

import startChatButtonLogo from '/startChatButton.svg';
import closeButtonLogo from '/closeButton.svg';
import profileLinkLogo from '/profileLink.svg';

// Импорт компонентов
import { HeaderChatList } from '../../components/header';

import './index.css';

const Messenger = ({onUserSelect}) => {
  const [isChatSelectionVisible, setChatSelectionVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [friends] = useState(['User1', 'User2', 'User3', 'User4', 'User5']);
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
      const storedFriendData = localStorage.getItem(friend);
      if (storedFriendData) {
        const parsedData = JSON.parse(storedFriendData);
        if (parsedData && parsedData.lastMessage) {
          displayMessages(parsedData);
        }
      }
    });

    const handleStorageChange = event => {
      if (friends.includes(event.key)) {
        const updatedFriend = JSON.parse(localStorage.getItem(event.key));
        if (updatedFriend && updatedFriend.lastMessage) {
          updateChat(updatedFriend);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
        badge: badge
      }
    ]);

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const saveMessage = message => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    console.log(storedMessages);
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
        time: new Date().toLocaleTimeString(),
        whom: 'User4',
        isReaded: false,
      };
      const message = {
        sender: 'User4',
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
    <div className='window'>
      <HeaderChatList/>

      <div className='chat-container' ref={chatContainerRef}>
        <div className='messages'>
          {messages.map((msg, index) => (
            <a href='#' onClick={() => onUserSelect(msg.whom)} className='message-link' key={index}>
              <div className='user-beep'>
                <img className='avatar' src={profileLinkLogo}/>
                <div className='user-details'>
                  <div className='top-container'>
                    <strong className='user'>{msg.whom}</strong> <small className='time-text'>{msg.time}</small>
                  </div>
                  <small className='message-text'>{msg.lastMessage}</small>
                </div>
              </div>
              <div className='badge'>{msg.badge}</div>
            </a>
          ))}
        </div>

        <button className='start-chat-button' onClick={() => setChatSelectionVisible(true)}>
            <img src={startChatButtonLogo}/>
        </button>

        {isChatSelectionVisible && (
          <>
          <div className='overlay'></div>
          <div className='users-container' ref={modalRef}>
            <div className='button-container'>
              <button className='close-user-selection-button' onClick={() => setChatSelectionVisible(false)}>
                <img src={closeButtonLogo}/>
              </button>
            </div>
            <div className='user-selection'>
              <div className='users-container-header'>
                <h2>Выберите собеседника:</h2>
              </div>
              <ul id='chatList'>
                {friends.map((friend, index) => (
                  <li key={index} onClick={() => onUserSelect(friend)}>
                    <a href='#'>
                      <img className='user-icon' src={profileLinkLogo}/>
                      {friend}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Messenger;
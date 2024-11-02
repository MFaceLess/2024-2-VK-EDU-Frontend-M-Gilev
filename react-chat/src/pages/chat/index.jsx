import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';

// Импорт компонентов
import {ChatSendMessageForm} from '../../components/chat-send-message-form';
import {Message} from '../../components/chat-message';
import {HeaderChat} from '../../components/header';

import './index.css';

const Chat = () => {
  const userDataBase = new Map([
    ['1', 'User1'],
    ['2', 'User2'],
    ['3', 'User3'],
    ['4', 'User4'],
    ['5', 'User5'],
  ]);
  //ловим id пользователя
  const { id } = useParams();

  //Обработчик пользователя
  const current_user = userDataBase.get(id);

  const [user, setUser] = useState(current_user);
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    loadMessage();
  }, []);

  const loadMessage = () => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(storedMessages.filter(message =>
      message.sender === user || (message.sender === 'You' && message.whom === user)
    ));
  };

  return (
    <div className='chat-page'>

      <HeaderChat user={user} />

      <div className='chat-container' ref={chatContainerRef}>
        {messages.map((message, index) => (
          <Message
            sender={message.sender}
            time={message.time}
            text={message.text}
            key={index}
          />
        ))}
      </div>

      <ChatSendMessageForm user={current_user} setMessages={setMessages} id={id}/>
      
    </div>
  );
}

export default Chat;
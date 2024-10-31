import React, { useState, useEffect, useRef } from 'react'

// Импорт компонентов
import {ChatSendMessageForm} from '../../components/chat-send-message-form';
import {Message} from '../../components/chat-message';
import {HeaderChat} from '../../components/header';

import './index.css';

const Chat = ({_current_user}) => {
  //Обработчик пользователя
  const current_user = _current_user[0];
  const user_handler = _current_user[1];

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
    <div>

      <HeaderChat user={user} user_handler={user_handler}/>

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

      <ChatSendMessageForm user={current_user} setMessages={setMessages}/>
      
    </div>
  );
}

export default Chat;
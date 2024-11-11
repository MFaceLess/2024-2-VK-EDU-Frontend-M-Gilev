import React, { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { ChatSendMessageForm } from '../../components/chat-send-message-form';
import { Message } from '../../components/chat-message';
import { HeaderChat } from '../../components/header';

import { Centrifuge } from 'centrifuge';


import './index.css';

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const friend = location.state?.friend;
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const messagesRef = useRef([]);

  useEffect(() => {
    fetch('https://vkedu-fullstack-div2.ru/api/chats/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        const existingChat = data.results.find(chat => 
          chat.is_private && chat.members.some(member => member.id === friend.id)
        );

        if (existingChat) {
          setChatId(existingChat.id);
        }
        // } else {
        //   createChat();
        // }
      })
      .catch(error => {
        alert(`${error}`);
      });
  }, [friend]);

  const startDialog = () => {
    fetch('https://vkedu-fullstack-div2.ru/api/chats/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'members': [friend.id],
        'is_private': true,
        'title': 'bug',
      }),
    })
    .then(response => response.json())
    .then(data => {
      setChatId(data.id);
      console.log(chatId);
      alert('Чат успешно создан!');
    })
    .catch(error => {
      alert(`${error}`);
    });
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!chatId) return;
    const chat = chatId;
    const page_size = 150;
    const params = new URLSearchParams({ chat, page_size });
    fetch(`https://vkedu-fullstack-div2.ru/api/messages/?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      const mesElem = data.results.reverse().map((message) => ({
        'sender': message.sender.first_name + ' ' + message.sender.last_name,
        'time': new Date(message.created_at).toLocaleString(),
        'text': message.text,
        'id': message.id,
        'senderId': message.sender.id,
      }));
      const newMessages = mesElem.filter(msg => !messagesRef.current.some(m => m.id === msg.id));
      if (newMessages.length > 0) {
        messagesRef.current = [...messagesRef.current, ...newMessages];
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      }
    })
    .catch((error) => {
      // alert(error);
    })
  }, [chatId])

  const { id } = useParams();

  useEffect(() => {
    const centrifuge = new Centrifuge('wss://vkedu-fullstack-div2.ru/connection/websocket/', {
      getToken: (ctx) =>
        fetch('https://vkedu-fullstack-div2.ru/api/centrifugo/connect/', {
          body: JSON.stringify(ctx),
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.json())
        .then((data) => data.token)
    });

    const subscription = centrifuge.newSubscription(localStorage.getItem('uuid'), {
      getToken: (ctx) =>
        fetch('https://vkedu-fullstack-div2.ru/api/centrifugo/subscribe/', {
          body: JSON.stringify(ctx),
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.json())
        .then((data) => data.token)
    });

    subscription.on('publication', (ctx) => {
      const { event, message } = ctx.data;
      if (event === 'create') {
        const newMessage = {
          sender: `${message.sender.first_name} ${message.sender.last_name}`,
          time: new Date(message.created_at).toLocaleString(),
          text: message.text,
          id: message.id,
          senderId: message.sender.id,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        messagesRef.current = [...messagesRef.current, newMessage];
      }
    });

    subscription.subscribe();
    centrifuge.connect();

    return () => centrifuge.disconnect();
  }, []);

  return (
    <div className='chat-page'>
      <HeaderChat user={friend} />
      <div className='chat-container' ref={chatContainerRef}>
        {messages.map((message, index) => (
          <Message
            sender={message.sender}
            time={message.time}
            text={message.text}
            senderId={message.senderId}
            key={index}
          />
        ))}
      </div>
      <div className="chat-footer">
        {!chatId && (
          <button className="register-button" onClick={startDialog}>Начать диалог</button>
        )}
        {chatId && <ChatSendMessageForm setMessages={setMessages} id={chatId} />}
      </div>
    </div>
  );
};

export default Chat;
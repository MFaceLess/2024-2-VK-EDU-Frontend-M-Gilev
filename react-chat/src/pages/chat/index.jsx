import React, { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { ChatSendMessageForm } from '../../components/chat-send-message-form';
import { Message } from '../../components/chat-message';
import { HeaderChat } from '../../components/header';
import { SendPhotosForm } from '../../components/send_photos';

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
  const [images, setImages] = useState(null);


  const [contextMenu, setContextMenu] = useState({  visible: false, x: 0, y: 0, messageId: null})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  //Обработка закрытия модалки
  useEffect(() => {
    const clickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    const escDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
        document.activeElement.blur();
      }
    };

    document.addEventListener('keydown', escDown);
    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('keydown', escDown);
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [setIsModalOpen]);

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
        'files': message.files ? message.files.map(file => {return file.item}) : [],
        'voice': message.voice,
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
      console.log(message);
      console.log(event);
      if (event === 'create') {
        const newMessage = {
          sender: `${message.sender.first_name} ${message.sender.last_name}`,
          time: new Date(message.created_at).toLocaleString(),
          text: message.text,
          id: message.id,
          senderId: message.sender.id,
          files: message.files ? message.files.map(file => {return file.item}) : [],
          voice: message.voice ? message.voice : null,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        messagesRef.current = [...messagesRef.current, newMessage];
      } else if (event === 'delete') {
        setMessages((prevMessages) => prevMessages.filter((elem) => elem.id !== message.id));
      }
    });

    subscription.subscribe();
    centrifuge.connect();

    return () => centrifuge.disconnect();
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).slice(0, 5);
    setImages(files);
    setIsModalOpen(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleContextMenu = (event, messageId) => {
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
      messageId,
    });
  };

  const handleCloseMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, messageId: null });
  };

  useEffect(() => {
    const clickOutside = (event) => {
      if (!event.target.closest('.context-menu')) {
        setContextMenu({ visible: false, x: 0, y: 0, messageId: null });
      }
    };
  
    const escDown = (event) => {
      if (event.key === 'Escape') {
        setContextMenu({ visible: false, x: 0, y: 0, messageId: null });
      }
    };
  
    document.addEventListener('keydown', escDown);
    document.addEventListener('mousedown', clickOutside);
  
    return () => {
      document.removeEventListener('keydown', escDown);
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await fetch(`https://vkedu-fullstack-div2.ru/api/message/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.detail || 'Ошибка при удалении сообщения');
      }
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='chat-page'>
      <HeaderChat user={friend} />
      {isModalOpen && (
        <div className="modal-background">
          <div className="modal-content" ref={modalRef}>
            <SendPhotosForm initialImages={images} chatId={chatId} setIsModalOpen={setIsModalOpen}/>
          </div>
        </div>
      )}
      <div className='chat-container' ref={chatContainerRef} onDrop={handleDrop} onDragOver={handleDragOver}>

        {contextMenu.visible && (
          <div 
            className="context-menu" 
            style={{ top: contextMenu.y, left: contextMenu.x }} 
            onClick={handleCloseMenu}
          >
            <div onClick={() => handleDeleteMessage(contextMenu.messageId)}>Удалить сообщение</div>
          </div>
        )}

        {messages.map((message, index) => (
            <Message
              sender={message.sender}
              time={message.time}
              text={message.text}
              senderId={message.senderId}
              files={message.files}
              voice={message.voice}
              key={index}

              onContextMenu={(event) => handleContextMenu(event, message.id)}
            />
        ))}
      </div>
      <div className="chat-footer">
        {!chatId && (
          <button className="register-button" onClick={startDialog}>Начать диалог</button>
        )}
        {chatId && <ChatSendMessageForm setMessages={setMessages} id={chatId} setImages={setImages} setIsModalOpen={setIsModalOpen}/>}
      </div>
    </div>
  );
};

export default Chat;
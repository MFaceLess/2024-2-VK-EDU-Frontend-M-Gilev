import React, { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { ChatSendMessageForm } from '../../components/chat-send-message-form';
import { Message } from '../../components/chat-message';
import { HeaderChat } from '../../components/header';
import { SendPhotosForm } from '../../components/send_photos';

import { useDispatch, useSelector } from 'react-redux';
import { setMessages, setChatId, setContextMenu, removeMessages} from '../../redux/slices/chatSlice';

import loadingLogo from '/loadingLogo.svg'
import sad from '/sadSmile.svg'

import './index.css';
import { fetchMessages } from '../../entityes/fetchMessages';
import { startDialog } from '../../entityes/fetchStartDialog';
import { setupCentrifugo } from '../../entityes/centrifuge';
import { fetchWithAuth } from '../../entityes/API/auth/fetchWithRefresh';

const Chat = () => {
  const navigate = useNavigate();
  const safeFetch = React.useMemo(() => {
    return fetchWithAuth(globalThis.fetch, navigate);
  }, [navigate])
  //Получаем id Chat
  const { id } = useParams();
  
  const location = useLocation();
  const friend = location.state?.friend;

  const chatContainerRef = useRef(null);
  const [images, setImages] = useState(null);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const { messages, chatId, contextMenu, loading, chatExist } = useSelector((state) => state.chat)

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
    safeFetch('https://vkedu-fullstack-div2.ru/api/chats/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(data => {
        const existingChat = data.results.find(chat => 
          chat.is_private && chat.members.some(member => member.id === friend.id)
        );

        if (existingChat) {
          dispatch(setChatId(existingChat.id));
        }
        // } else {
        //   createChat();
        // }
      })
      .catch(error => {
        // alert(`${error}`);
      });
  }, [friend]);

  const handleStartDialog = () => {
    dispatch(startDialog(friend.id));
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchMessages({chatId: id, navigate}));
    dispatch(setupCentrifugo(localStorage.getItem('uuid'), safeFetch, navigate));
  }, [id])

  // useEffect(() => {
  //   if (chatExist) {
  //     dispatch(fetchMessages({chatId: id, navigate}));
  //   }
  // }, [id, chatExist])

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

    dispatch(setContextMenu({
      visible: true,
      x,
      y,
      messageId,
    }));
  };

  const handleCloseMenu = () => {
    dispatch(setContextMenu({ visible: false, x: 0, y: 0, messageId: null }));
  };

  useEffect(() => {
    const clickOutside = (event) => {
      if (!event.target.closest('.context-menu')) {
        dispatch(setContextMenu({ visible: false, x: 0, y: 0, messageId: null }));
      }
    };
  
    const escDown = (event) => {
      if (event.key === 'Escape') {
        dispatch(setContextMenu({ visible: false, x: 0, y: 0, messageId: null }));
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
      dispatch(removeMessages(messageId))
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
            <SendPhotosForm initialImages={images} chatId={id} setIsModalOpen={setIsModalOpen}/>
          </div>
        </div>
      )}
      <div className='chat-container' ref={chatContainerRef} onDrop={handleDrop} onDragOver={handleDragOver}>

        {contextMenu.visible && !isModalOpen && (
          <div 
            className="context-menu" 
            style={{ top: contextMenu.y, left: contextMenu.x }} 
            onClick={handleCloseMenu}
          >
            <div onClick={() => handleDeleteMessage(contextMenu.messageId)}>Удалить сообщение</div>
          </div>
        )}

        {loading && <div className='loadingLogo'><img src={loadingLogo}/></div>}

        {!loading && messages.length === 0 && (
          <div className='NoMessages'>
            {`Нет сообщений :(`}
            <img src={sad}></img>
          </div>
        )}
        {!loading && chatExist && messages.map((message, index) => (
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
        {!chatExist && (
          <button className="register-button" onClick={handleStartDialog}>Начать диалог</button>
        )}
        {chatExist && <ChatSendMessageForm setMessages={setMessages} id={chatId} setImages={setImages} setIsModalOpen={setIsModalOpen}/>}
      </div>
    </div>
  );
};

export default Chat;
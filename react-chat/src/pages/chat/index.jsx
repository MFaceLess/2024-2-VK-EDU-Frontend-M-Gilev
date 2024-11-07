// import React, { useState, useEffect, useRef } from 'react'
// import { useParams, useLocation, useNavigate } from 'react-router-dom';

// // Импорт компонентов
// import {ChatSendMessageForm} from '../../components/chat-send-message-form';
// import {Message} from '../../components/chat-message';
// import {HeaderChat} from '../../components/header';

// import './index.css';

// const Chat = () => {
//   const navigate = useNavigate();

//   const location = useLocation();
//   const friend = location.state?.friend;
//   // const msg = location.state?.msg;

//   useEffect(() => {
//     //Получаем id текущего пользователя, затем передаем его дальше
//     const yourId = localStorage.getItem('uuid');
//     //Инициализируем чат
//     fetch('/api/chats/', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('access')}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         'members' : [
//           yourId,
//           friend.id,
//         ],
//         'is_private': true,
//         'title': 'bug',
//       }),
//     })
//     .then((response) => {
//       if (!response.ok) {
//           return response.json().then((errorData) => {
//               if (errorData.code === 'token_not_valid') {
//                   navigate('/auth');
//               } else {
//                 throw new Error(`${errorData}`);
//               }
//           });
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       alert('Чат успешно создан!');
//     })
//     .catch((error) => {
//       alert(`${error}`);
//     })
//     //-------------------------------------
//   }, [])
  

//   const userDataBase = new Map([
//     ['1', 'User1'],
//     ['2', 'User2'],
//     ['3', 'User3'],
//     ['4', 'User4'],
//     ['5', 'User5'],
//   ]);
//   //ловим id пользователя
//   const { id } = useParams();

//   //Обработчик пользователя
//   const current_user = userDataBase.get(id);

//   const [messages, setMessages] = useState([]);
//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // useEffect(() => {
//   //   loadMessage();
//   // }, []);

//   // const loadMessage = () => {
//   //   const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
//   //   setMessages(storedMessages.filter(message =>
//   //     message.sender === user || (message.sender === 'You' && message.whom === user)
//   //   ));
//   // };

//   return (
//     <div className='chat-page'>

//       <HeaderChat user={friend}/>

//       <div className='chat-container' ref={chatContainerRef}>
//         {messages.map((message, index) => (
//           <Message
//             sender={message.sender}
//             time={message.time}
//             text={message.text}
//             key={index}
//           />
//         ))}
//       </div>

//       <ChatSendMessageForm user={current_user} setMessages={setMessages} id={id}/>
      
//     </div>
//   );
// }

// export default Chat;

import React, { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { ChatSendMessageForm } from '../../components/chat-send-message-form';
import { Message } from '../../components/chat-message';
import { HeaderChat } from '../../components/header';

import './index.css';

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const friend = location.state?.friend;
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const yourId = localStorage.getItem('uuid');

    fetch('/api/chats/', {
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
          alert('Чат уже существует!');
        } else {
          createChat(yourId);
        }
      })
      .catch(error => {
        alert(`${error}`);
      });
  }, [friend]);

  const createChat = (yourId) => {
    fetch('/api/chats/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'members': [yourId, friend.id],
        'is_private': true,
        'title': 'bug',
      }),
    })
      .then(response => response.json())
      .then(data => {
        setChatId(data.id);
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

  const { id } = useParams();
  const userDataBase = new Map([
    ['1', 'User1'],
    ['2', 'User2'],
    ['3', 'User3'],
    ['4', 'User4'],
    ['5', 'User5'],
  ]);
  const current_user = userDataBase.get(id);

  return (
    <div className='chat-page'>
      <HeaderChat user={friend} />
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
      <ChatSendMessageForm user={current_user} setMessages={setMessages} id={id} />
    </div>
  );
};

export default Chat;
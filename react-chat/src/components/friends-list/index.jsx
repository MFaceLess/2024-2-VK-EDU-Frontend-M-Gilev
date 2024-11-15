import React, { useEffect, useState, useRef, createRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import closeButtonLogo from '/closeButton.svg';
import profileLinkLogo from '/profileLink.svg';

import './index.css'

export const FriendList = ({modalRef, setChatSelectionVisible}) => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);

  const [page, setPage] = useState(1);
  const [pagesNum, setPagesNum] = useState(0);
  const page_size = 20;

  const lastItem = createRef();
  const observerLoader = useRef();

  useEffect(() => {
    fetch('https://vkedu-fullstack-div2.ru/api/users/?page_size=20', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      if (!response.ok) {
          return response.json().then((errorData) => {
              if (errorData.code === 'token_not_valid') {
                  navigate('/auth');
              } else {
                throw new Error(`${errorData}`);
              }
          });
      }
      return response.json();
    })
    .then((data) => {
      const myId = localStorage.getItem('uuid');
      const filteredFriends = data.results.filter(friend => friend.id !== myId);
      setFriends(filteredFriends);
      setPagesNum(Math.ceil(Number(data.count) / page_size));
      setPage((prevPage) => prevPage + 1);
    })
    .catch((error) => {
      // alert(`${error}`);
    })
  }, []);

  const getNewFriends = async () => {
    const params = new URLSearchParams({ page_size, page });
    try {
      const response = await fetch(`https://vkedu-fullstack-div2.ru/api/users/?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Ошибка при получении списка чатов');
      const data = await response.json();
      const myId = localStorage.getItem('uuid');
      const filteredFriends = data.results.filter(friend => friend.id !== myId);
      setFriends((prevFriends) => [...prevFriends, ...filteredFriends]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      navigate('/auth');
    }
  };

  const actionInSight = (entries) => {
    if (entries[0].isIntersecting) {
      if (page <= pagesNum) {
        getNewFriends();
      }
    }
  };

  //действия при изменении последнего элемента списка
  // useEffect(() => {
  //   //удаляем старый объект наблюдателя
  //   if (observerLoader.current) {
  //     observerLoader.current.disconnect();
  //   }

  //   //создаём новый объект наблюдателя
  //   observerLoader.current = new IntersectionObserver(actionInSight);

  //   //вешаем наблюдателя на новый последний элемент
  //   if (lastItem.current) {
  //     observerLoader.current.observe(lastItem.current);
  //   }
  // }, [lastItem]);

  useEffect(() => {
    if (observerLoader.current) observerLoader.current.disconnect();

    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastItem.current) observerLoader.current.observe(lastItem.current);
  }, [friends]);

  return (
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
                <li 
                  key={index}
                  ref={index === friends.length - 1 ? lastItem : null}
                >
                  < Link to={`/chat/${friend.id}`} 
                    state={{friend}}
                    className='messenger-user-chat'
                  >
                    <img className='user-avatar' src={friend.avatar || profileLinkLogo}/>
                    {friend.first_name} {friend.last_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
  );
};

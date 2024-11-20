import React, { useEffect, useState, useRef, createRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash'

import closeButtonLogo from '/closeButton.svg';
import profileLinkLogo from '/profileLink.svg';

import './index.css'

export const FriendList = ({modalRef, setChatSelectionVisible}) => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const [pagesNum, setPagesNum] = useState(0);
  const page_size = 20;

  const lastItem = createRef();
  const observerLoader = useRef();

  useEffect(() => {
    const debounced = debounce((searchValue) => {
      setPage(1);
      setFriends([]);
      getNewFriends(searchValue);
    }, 500);
  
    debounced(search);
  
    return () => debounced.cancel();
  }, [search])

  useEffect(() => {
    if (page === 1 && friends.length === 0) {
      getNewFriends(search);
    }
  }, [page, search])

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

  const getNewFriends = async (searchParam = '') => {
    let params = new URLSearchParams({
      page_size,
      page,
    });
  
    if (searchParam) {
      params.append('search', searchParam);
    }

    try {
      const response = await fetch(`https://vkedu-fullstack-div2.ru/api/users/?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const data = await response.json();
        if (data.detail === 'Invalid page.') {
          if (page === 1) {
            return;
          }
          setPage(1);
          return;
        }
        throw new Error(data.detail);
      }
      const data = await response.json();
      const myId = localStorage.getItem('uuid');
      const filteredFriends = data.results.filter(friend => friend.id !== myId);
      setFriends((prevFriends) =>
        page === 1 ? filteredFriends : [...prevFriends, ...filteredFriends]
      );
      setPage((prevPage) => prevPage + 1);
      setPagesNum(Math.ceil(Number(data.count) / page_size));
    } catch (error) {
      alert(error);
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
            <div className='find-user'>
              <input type='text' placeholder='Найти' onChange={(e) => {setSearch(e.target.value)}}/>
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

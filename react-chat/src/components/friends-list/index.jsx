import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import closeButtonLogo from '/closeButton.svg';
import profileLinkLogo from '/profileLink.svg';

import './index.css'

export const FriendList = ({modalRef, setChatSelectionVisible}) => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetch('https://vkedu-fullstack-div2.ru/api/users/?page_size=100000', {
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
      setFriends(data.results);
    })
    .catch((error) => {
      alert(`${error}`);
    })
  }, []);

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
              {friends.map((friend) => (
                <li key={friend.id}>
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

import React from 'react';
import { Link } from 'react-router-dom';

import closeButtonLogo from '/closeButton.svg';
import profileLinkLogo from '/profileLink.svg';

import './index.css'

export const FriendList = ({modalRef, setChatSelectionVisible, friends}) => {
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
                    <Link to={`/chat/${friend.id}`} className='messenger-user-chat'>
                      <img className='user-icon' src={profileLinkLogo}/>
                      {friend.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
    );
};

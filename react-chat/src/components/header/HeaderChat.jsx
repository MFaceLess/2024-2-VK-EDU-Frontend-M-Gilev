import React from 'react'
import { Link } from 'react-router-dom'

import backButtonLogo from '/backButton.svg'
import menuButtonLogo from '/menuButton.svg'
import profileLinkLogo from '/profileLink.svg'
import searchButtonLogo from '/searchButton.svg'

import './HeaderChat.css'

export const HeaderChat = ({ user }) => {
    return (
        <header className='chat-header'>

        <Link to='/' className='back-button'>
          <img src={backButtonLogo}/>
        </Link>

        <a href='#2' className='profile-link'>
          <img src={profileLinkLogo}/>
        </a>

        <div className='user-info'>
          <h3>{user || 'User'}</h3>
          <p>last seen 2 hours ago</p>
        </div>

        <div className='right-icons'>
          <button>
            <img src={searchButtonLogo}/>
          </button>
          <button>
            <img src={menuButtonLogo}/>
          </button>
        </div>

      </header>
    );
};
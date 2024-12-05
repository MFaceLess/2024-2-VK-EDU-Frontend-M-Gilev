import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import backButtonLogo from '/backButton.svg'
import menuButtonLogo from '/menuButton.svg'
import profileLinkLogo from '/profileLink.svg'
import searchButtonLogo from '/searchButton.svg'

import './HeaderChat.css'
import { LazyImage } from '../lazy-image'

export const HeaderChat = ({ user }) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate('/');
      }
    }, [])

    return (
        user && (
            <header className='chat-header'>

            <Link to='/' className='back-button'>
              <img src={backButtonLogo}/>
            </Link>

            <div className='profile-link'>
              <LazyImage src={user.avatar || profileLinkLogo} />
              {/* <img src={user.avatar || profileLinkLogo}/> */}
            </div>

            <div className='user-info'>
              <h3>{user.first_name + ' ' +  user.last_name || 'User'}</h3>
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
        )
    );
};
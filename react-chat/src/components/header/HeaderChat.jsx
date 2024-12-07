import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import backButtonLogo from '/backButton.svg'
import menuButtonLogo from '/menuButton.svg'
import profileLinkLogo from '/profileLink.svg'
import searchButtonLogo from '/searchButton.svg'
import { ConvertDateToString } from '../../entityes/utils/convertDateToString'

import './HeaderChat.css'
import { LazyImage } from '../lazy-image'

export const HeaderChat = ({ user, title, avatar, is_online, last_online_at, isCommonChat }) => {
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
              <LazyImage src={avatar || profileLinkLogo} />
              {/* <img src={user.avatar || profileLinkLogo}/> */}
            </div>

            <div className='user-info'>
              <h3>{title}</h3>
              {!isCommonChat &&
              <p>{is_online ? 'online' : `last seen ${ConvertDateToString.convDateToStringFormat(null, new Date(last_online_at))}`}</p>}
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
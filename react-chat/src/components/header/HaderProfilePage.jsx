import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import okLogo from '/ok.svg';
import backButtonLogo from '/backButton.svg';

import './HeaderChatList.css'

export const HeaderProfilePage = () => {
    return (
        <div className='messenger-header'>
            <Link to={'/'} className='burger'>
                <img src={backButtonLogo}/>
            </Link>
            <div className='messenger'>
            <h1>Edit Profile</h1>
            </div>
            <button className='search-icon'>
                <img src={okLogo}/>
            </button>
        </div>
    );
};
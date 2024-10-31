import React from 'react';

import burgerLogo from '/burger.svg';
import searchButtonLogo from '/searchButton.svg';

import './HeaderChatList.css'

export const HeaderChatList = () => {
    return (
        <div className='messenger-header'>
            <button className='burger'>
                <img src={burgerLogo}/>
            </button>
            <div className='messenger'>
            <h1>Messenger</h1>
            </div>
            <button className='search-icon'>
                <img src={searchButtonLogo}/>
            </button>
        </div>
    );
};
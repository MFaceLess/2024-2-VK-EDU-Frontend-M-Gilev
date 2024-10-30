import React, {useState} from 'react';

import burgerLogo from '/burger.svg';
import searchButtonLogo from '/searchButton.svg';

import './HeaderChatList.css'

export const HeaderChatList = ( {setBurgerMenuVisible} ) => {
    
    const toggleMenu = () => {
        setBurgerMenuVisible(prevState => !prevState);
    }

    return (
        <div className='messenger-header'>
            <button className='burger' onClick={toggleMenu}>
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
import React from 'react';

import './index.css'

export const Message = ({sender, time, text, senderId}) => {
    return (
        <div className={`message ${senderId === localStorage.getItem('uuid') ? 'you' : 'opponent'}`}>
        <strong className='message-text'>{sender}</strong> <small className='message-text'>{time}</small>
        <p className='message-text'>{text}</p>
        </div>
    );
};

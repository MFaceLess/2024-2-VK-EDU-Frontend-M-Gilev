import React from 'react';

import './index.css'

export const Message = ({sender, time, text}) => {
    return (
        <div className={`message ${sender === 'You' ? 'you' : 'opponent'}`}>
        <strong className='message-text'>{sender}</strong> <small className='message-text'>{time}</small>
        <p className='message-text'>{text}</p>
        </div>
    );
};

import React, { useEffect } from 'react';

import './index.css'

export const Message = ({sender, time, text, senderId, files, voice}) => {
    return (
        <div className={`message ${senderId === localStorage.getItem('uuid') ? 'you' : 'opponent'}`}>
        <strong className='message-text'>{sender}</strong> <small className='message-text'>{time}</small>
        <p className='message-text'>{text}</p>
        { voice && (
            <audio controls className="message-audio">
                <source src={voice} type="audio/ogg" />
                Your browser does not support the audio element.
            </audio>
        )}
        {files.length > 0 && (
                <div className="message-images">
                    {files.map((file, index) => (
                        <img key={index} src={file} alt={`image-${index}`} className="message-image" />
                    ))}
                </div>
            )}
        </div>
    );
};

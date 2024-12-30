import React from 'react';
import PropTypes from 'prop-types';
import { ConvertDateToString } from '../../entityes/utils/convertDateToString';

import './index.css'


export const Message = ({sender, time, text, senderId, files, voice, onContextMenu}) => {
    return (
        <div className={`message ${senderId === localStorage.getItem('uuid') ? 'you' : 'opponent'}`}
            onContextMenu={(event) => onContextMenu(event)}
        >
        <strong className='message-text'>{sender}</strong> <small className='message-text'>{ConvertDateToString.convDateToStringFormat(time)}</small>
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

Message.propTypes = {
    sender: PropTypes.string,
    time: PropTypes.string,
    text: PropTypes.string,
    senderId: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.string),
    voice: PropTypes.string,
    onContextMenu: PropTypes.func,
};
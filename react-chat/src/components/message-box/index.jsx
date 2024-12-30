import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'

import './index.css'

export const MessageBox = ( {text, setVisible} ) => {
    const navigate = useNavigate();

    const handleDeleteProfile = async () => {
        try {
            const response = await fetch(`https://vkedu-fullstack-div2.ru/api/user/${localStorage.getItem('uuid')}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.detail || 'Ошибка при удалении сообщения');
            }
            localStorage.clear();
            navigate('/auth');
        } catch (error) {
            alert(error);
            navigate('/');
        }
    }

    return (
        <div className='message-box-container'>
            <div className='message-box-text'>
                {text}
            </div>
            <div className='confirm-buttons'>
                <button className="delete-button" onClick={() => handleDeleteProfile()}>
                    Ok
                </button>
                <button className="register-button" onClick={() => setVisible(false)}>
                    Cancel
                </button>
            </div>
        </div> 
    );
}

MessageBox.propTypes = {
    text: PropTypes.string,
    setVisible: PropTypes.func,
};
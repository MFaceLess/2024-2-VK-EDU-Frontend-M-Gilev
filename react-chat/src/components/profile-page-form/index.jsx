import React, { useState } from 'react';

import './index.css'

export const ProfilePageForm = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
  
    return (
        <form className='profile-form'>
            <div className='form-group'>
                <label htmlFor='fullName'>Full Name</label>
                <input
                type='text'
                id='fullName'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete='off'
                />
            </div>

            <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete='off'
                />
                <small className='hint'>Minimum length is 5 characters</small>
            </div>

            <div className='form-group'>
                <label htmlFor='bio'>Bio</label>
                <textarea
                id='bio'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows='4'
                autoComplete='off'
                />
                <small className='hint'>Any details about you</small>
            </div>

        </form>
    );
};

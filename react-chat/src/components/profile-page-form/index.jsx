import React, { forwardRef, useEffect, useState } from 'react';

import './index.css'

export const ProfilePageForm = forwardRef((props, ref) => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
  
    const [usernameColor, setUserNameColor] = useState('#ccc'); 

    useEffect(() => {
        const profileParameters = localStorage.getItem('profileParameters');
        if (profileParameters) {
            const {fullName, username, bio} = JSON.parse(profileParameters);
            setFullName(fullName);
            setUsername(username);
            setBio(bio);
        }
    }, [])

    useEffect(() => {
        if (validateUsername(username) === true) {
            setUserNameColor('#ccc');
        } else {
            setUserNameColor('red');
        }
    }, [username])

    const validateUsername = (username) => {
        return username.length >= 5;
    }

    const saveProfileParameters = () => {
        const objToSave = {
            fullName: fullName,
            username: username,
            bio: bio,
        };
        localStorage.setItem('profileParameters', JSON.stringify(objToSave));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateUsername(username) === true) {
            saveProfileParameters();
            alert("Данные успешно обновлены!");
        } else {
            alert("Введите корректный пароль!");
        }
    }

    return (
        <form ref={ref} className='profile-form' onSubmit={handleSubmit}>
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
                style={{borderColor:usernameColor}}
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
});

import React, { forwardRef, useEffect, useState } from 'react';

import './index.css'

export const ProfilePageForm = forwardRef((props, ref) => {
    const [fullName, setFullName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
  
    const [usernameColor, setUserNameColor] = useState('#ccc');

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const url = 'https://vkedu-fullstack-div2.ru/api/user/current/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(`${errorData}`);
                });
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            alert(`Ошибка ${error}`);
        })
    }, [])

    const saveProfileParameters = () => {
        const objToSave = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            bio: bio,
            avatar: avatar,
        };
        localStorage.setItem('profileParameters', JSON.stringify(objToSave));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Данные успешно обновлены!");
    }

    return (
        <form ref={ref} className='profile-form' onSubmit={handleSubmit}>
            
            <div className='profile-form-group'>
                <div className='avatar-container'>
                    <input
                        type='file'
                        id='avatar'
                        accept='image/*'
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                    />
                    <button
                        type='button'
                        className={`avatar-button ${avatar ? 'has-image' : ''}`}
                        onClick={() => document.getElementById('avatar').click()}
                    >
                        {avatar ? (
                            <img src={avatar} alt='Avatar preview' className='avatar-preview' />
                        ) : (
                            <span className='avatar-placeholder'>+</span>
                        )}
                    </button>
                </div>
            </div>

            <div className='profile-form-group'>
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

            <div className='profile-form-group'>
                <label htmlFor='firstName'>First Name</label>
                <input
                type='text'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoComplete='off'
                />
            </div>

            <div className='profile-form-group'>
                <label htmlFor='lastName'>Last Name</label>
                <input
                type='text'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                autoComplete='off'
                />
            </div>

            <div className='profile-form-group'>
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

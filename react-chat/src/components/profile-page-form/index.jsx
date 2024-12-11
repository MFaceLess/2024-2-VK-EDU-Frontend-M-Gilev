import React, { forwardRef, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom'

import './index.css'
import { MessageBox } from '../message-box';

export const ProfilePageForm = forwardRef((props, ref) => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    const [avatarFile, setAvatarFile] = useState(null);

    const [usernameColor] = useState('#ccc');

    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
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
                    if (errorData.code === 'token_not_valid') {
                        navigate('/auth');
                    }
                    throw new Error(`${errorData}`);
                });
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setUsername(data.username);
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setBio(data.bio);
            setAvatar(data.avatar);
            localStorage.setItem('uuid', data.id);
        })
        .catch((error) => {
            alert(`${error}`);
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('bio', bio);
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        fetch(`https://vkedu-fullstack-div2.ru/api/user/${localStorage.getItem('uuid')}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            },
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    for (var key in errorData) {
                        errorData[key].forEach((error) => {
                            // switch (key) {
                            //     case 'password':
                            //         setPasswordColor('red');
                            //         setPasswordError(error);
                            //         break;
                            //     case 'username':
                            //         setUserNameColor('red');
                            //         setUsernameError(error);
                            //         break;
                            // }
                            throw new Error(error);
                        })
                    }
                });
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            alert("Данные успешно обновлены!");
        })
        .catch((error) => {
            alert(`${error}`);
        })
    }

    // const handleDeleteProfile = async () => {
    //     try {
    //         const response = await fetch(`https://vkedu-fullstack-div2.ru/api/user/${localStorage.getItem('uuid')}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('access')}`,
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(errorData?.detail || 'Ошибка при удалении сообщения');
    //         }
    //         navigate('/auth');
    //     } catch (error) {
    //         alert(error);
    //         navigate('/');
    //     }
    // }

    return (
        <>
        {confirmDelete && (
            <>
                <div className="overlay-message-box" onClick={() => setConfirmDelete(false)}></div>
                <MessageBox text={"Are you sure to DELETE your profile?"} setVisible={setConfirmDelete} />
            </>
        )}
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

            <button className='delete-button' onClick={(e) => {
                e.preventDefault();
                setConfirmDelete(true);
            }}>
                Delete profile
            </button>

        </form>

        </>
    );
});


ProfilePageForm.displayName = 'ProfilePageForm';
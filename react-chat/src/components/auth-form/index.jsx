import React, { forwardRef, useEffect, useState } from 'react';

import './index.css'

export const AuthForm = forwardRef((props, ref) => {
    const [isLogin, setIsLogin] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
  
    
    //Фронтенд ошибок
    const [usernameColor, setUserNameColor] = useState('#ccc'); 
    const [passwordColor, setPasswordColor] = useState('#ccc');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    //---------------

    // useEffect(() => {
    //     if (validateUsername(username) === true) {
    //         setUserNameColor('#ccc');
    //     } else {
    //         setUserNameColor('red');
    //     }
    // }, [username])

    // const validateUsername = (username) => {
    //     if (username.length < 1 || username.length > 150) {
    //         return false;
    //     }
    //     const pattern = /^[\w.@+-]+$/;
    //     return pattern.test(username);
    // }

    const registerUser = () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        if (bio) {
            formData.append('bio', bio);
        }
        if (avatar) {
            formData.append('avatar', avatar);
        }

        // const res = await fetch('https://vkedu-fullstack-div2.ru/api/register/', {
        //     method: 'POST',
        //     body: formData,
        // })

        // const json = await res.json();
        // alert(json);

        fetch('/api/register/', {
            method: 'POST',
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    for (var key in errorData) {
                        errorData[key].forEach((error) => {
                            switch (key) {
                                case 'password':
                                    setPasswordColor('red');
                                    setPasswordError(error);
                                    break;
                                case 'username':
                                    setUserNameColor('red');
                                    setUsernameError(error);
                                    break;
                            }
                            throw new Error(error);
                        })
                    }
                    // if (errorData.password) {
                    //     errorData.password.forEach((error, index) => {
                    //         console.log(`Ошибка пароля ${index + 1}: ${error}`);
                    //     });
                    // }
                    // throw new Error(errorData.message || 'Не удалось зарегистрировать');
                });
            }
            return response.json();
        })
        .then((data) => {
            alert('Пользователь успешно зарегистрирован!');
        })
        .catch((error) => {
            alert(`Ошибка: ${error.message}`);
        })
    }

    const loginUser = () => {
        fetch('https://vkedu-fullstack-div2.ru/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error('Ошибка: Неверный логин или пароль');
                });
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            alert('You are logged in!');
        })
        .catch((error) => {
            alert(`Ошибка ${error}`);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            loginUser();
        } else {
            registerUser();
        }
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
        }
    };

    return (
        <form ref={ref} className='auth-form' onSubmit={handleSubmit}>
            
            {!isLogin && (
                <div className='auth-form-group'>
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
                                <img src={URL.createObjectURL(avatar)} alt='Avatar preview' className='avatar-preview' />
                                // <img src={avatar} alt='Avatar preview' className='avatar-preview' />
                            ) : (
                                <span className='avatar-placeholder'>+</span>
                            )}
                        </button>
                    </div>
                </div>
            )}

            <div className='auth-form-group'>
                <label htmlFor='username'>Username</label>
                <input
                type='text'
                id='username'
                value={username}
                onChange={(e) => { 
                    setUserNameColor('#ccc');
                    setUsernameError('');
                    setUsername(e.target.value);
                }}
                required
                autoComplete='off'
                style={{borderColor:usernameColor}}
                />
                <small className='hint'>{usernameError}</small>
            </div>

            <div className='auth-form-group'>
                <label htmlFor='password'>Password</label>
                <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => {
                    setPasswordColor('#ccc');
                    setPasswordError('');
                    setPassword(e.target.value);
                }}
                required
                autoComplete='off'
                style={{borderColor: passwordColor}}
                />
                <small className='hint'>{passwordError}</small>
            </div>

            {!isLogin && (
                <>
                    <div className='auth-form-group'>
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

                    <div className='auth-form-group'>
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

                    <div className='auth-form-group'>
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
                </>
            )}

            <button type='submit' className='register-button'>
                {isLogin ? 'Login' : 'Register'}
            </button>

            <div className='toggle-form'>
                <span onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </span>
            </div>

        </form>
    );
});

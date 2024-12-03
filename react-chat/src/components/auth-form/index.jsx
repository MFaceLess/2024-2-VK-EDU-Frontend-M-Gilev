import React, { forwardRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from '../../entityes/API/auth/fetchRegister';

import './index.css'
import { useDispatch } from 'react-redux';
import { fetchAuth } from '../../entityes/API/auth/fetchAuth';
import { toast } from 'react-toastify';

export const AuthForm = forwardRef((props, ref) => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
  
    const dispatch = useDispatch();

    //Фронтенд ошибок
    const [usernameColor, setUserNameColor] = useState('#ccc'); 
    const [passwordColor, setPasswordColor] = useState('#ccc');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    //---------------

    useEffect(() => {
        setUserNameColor('#ccc');
        setUsernameError('');

        setPasswordColor('#ccc');
        setPasswordError('');
    }, [isLogin])

    // useEffect(() => {
    //     if (localStorage.getItem('uuid') && localStorage.getItem('access') && localStorage.getItem('refresh')){
    //         navigate('/');
    //     }
    // }, [])

    const registerUser = async () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('bio', bio || '');
        if (avatar) formData.append('avatar', avatar);

        try {
            const data = await dispatch(fetchRegister(formData)).unwrap();
            localStorage.setItem('uuid', data.id);
            toast.success('Пользователь успешно зарегестрирован!');
        } catch (errorData) {
            console.log(errorData)
            handleErrors(JSON.parse(errorData.message));
        }
    }

    const handleErrors = (errorData) => {
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
                    default:
                        break;
                }
            });
        }
    }

    const loginUser = async () => {
        try {
            await dispatch(fetchAuth({username, password})).unwrap();
            toast.success('Вы успешно вошли в систему!');
            // navigate('/');
        } catch (errorData) {
            setPasswordError(JSON.parse(errorData.message).detail);
            setPasswordColor('red');
            setUserNameColor('red');
        }
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
                    setPasswordColor('#ccc');
                    setPasswordError('');
                    setUsername(e.target.value);
                }}
                required
                autoComplete='off'
                style={{borderColor:usernameColor}}
                />
                <small className='hint' style={{color: 'red'}}>{usernameError}</small>
            </div>

            <div className='auth-form-group'>
                <label htmlFor='password'>Password</label>
                <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => {
                    setUserNameColor('#ccc');
                    setUsernameError('');
                    setPasswordColor('#ccc');
                    setPasswordError('');
                    setPassword(e.target.value);
                }}
                required
                autoComplete='off'
                style={{borderColor: passwordColor}}
                />
                <small className='hint' style={{color: 'red'}}>{passwordError}</small>
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

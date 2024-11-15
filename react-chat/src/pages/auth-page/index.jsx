import React, { useRef } from 'react'

import profileLinkLogo from '/profileLink.svg';

// Импорт компонентов
import { AuthForm } from '../../components/auth-form';
import { HeaderProfilePage } from '../../components/header';

import './index.css';

const AuthPage = () => {

  return (
    <div className='profile-page-wrapper'>

      <HeaderProfilePage title={'Authorization'} hasRightIcon={false}/>

      <div className='edit-profile-container'>
        {/* <img className='avatar' src={profileLinkLogo}/> */}
        <AuthForm />
      </div>
      
    </div>
  );
}

export default AuthPage;
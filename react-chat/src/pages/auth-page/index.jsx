import React, { useEffect } from 'react'


// Импорт компонентов
import { AuthForm } from '../../components/auth-form';
import { HeaderProfilePage } from '../../components/header';
import { unconnect } from '../../entityes/centrifuge';

import './index.css';

const AuthPage = () => {

  useEffect(() => {
    unconnect();
  }, [])

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
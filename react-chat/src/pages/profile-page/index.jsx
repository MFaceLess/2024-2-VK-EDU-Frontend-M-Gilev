import React, { useState, useEffect, useRef } from 'react'

import profileLinkLogo from '/profileLink.svg';

// Импорт компонентов
import { ProfilePageForm } from '../../components/profile-page-form';
import { HeaderProfilePage } from '../../components/header';

import './index.css';

const ProfilePage = () => {
  

  return (
    <div className='profile-page-wrapper'>

      <HeaderProfilePage />

      <div className='edit-profile-container'>
        <img className='avatar' src={profileLinkLogo}/>
        <ProfilePageForm />
      </div>
      
    </div>
  );
}

export default ProfilePage;
import React, { useRef } from 'react'

import profileLinkLogo from '/profileLink.svg';

// Импорт компонентов
import { ProfilePageForm } from '../../components/profile-page-form';
import { HeaderProfilePage } from '../../components/header';

import './index.css';

const ProfilePage = () => {
  const formRef = useRef(null);

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div className='profile-page-wrapper'>

      <HeaderProfilePage onSubmit={handleFormSubmit}/>

      <div className='edit-profile-container'>
        <img className='avatar' src={profileLinkLogo}/>
        <ProfilePageForm ref={formRef}/>
      </div>
      
    </div>
  );
}

export default ProfilePage;
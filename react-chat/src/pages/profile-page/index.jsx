import React, { useRef } from 'react'

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

      <HeaderProfilePage onSubmit={handleFormSubmit} title={'Edit Progile'}/>

      <div className='edit-profile-container'>
        <ProfilePageForm ref={formRef}/>
      </div>
      
    </div>
  );
}

export default ProfilePage;
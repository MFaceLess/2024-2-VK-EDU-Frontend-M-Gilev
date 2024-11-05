import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import okLogo from '/ok.svg';
import backButtonLogo from '/backButton.svg';

import './HeaderProfilePage.css'

export const HeaderProfilePage = ( {onSubmit} ) => {
    return (
        <div className='profile-page-header'>
            <Link to={'/'} className='profile-page-back-button'>
                <img src={backButtonLogo}/>
            </Link>
            <div className='profile-page-title'>
            <h1>Edit Profile</h1>
            </div>
            <button className='page-profile-okIcon' onClick={onSubmit}>
                <img src={okLogo}/>
            </button>
        </div>
    );
};
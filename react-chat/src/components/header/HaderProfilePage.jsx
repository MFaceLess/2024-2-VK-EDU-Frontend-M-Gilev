import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import okLogo from '/ok.svg';
import backButtonLogo from '/backButton.svg';

import './HeaderProfilePage.css'

export const HeaderProfilePage = ( {onSubmit, title, hasBackButton, hasRightIcon=true} ) => {
    return (
        <div className='profile-page-header'>
            { hasBackButton ?? (
                <Link to={'/'} className='profile-page-back-button'>
                    <img src={backButtonLogo}/>
                </Link>
            )}
            <div className='profile-page-title'>
            <h1>{title}</h1>
            </div>
            {hasRightIcon &&(
                <button className='page-profile-okIcon' onClick={onSubmit}>
                    <img src={okLogo}/>
                </button>
            )}
        </div>
    );
};

HeaderProfilePage.propTypes = {
    onSubmit: PropTypes.func,
    title: PropTypes.string,
    hasBackButton: PropTypes.bool,
    hasRightIcon: PropTypes.bool,
};
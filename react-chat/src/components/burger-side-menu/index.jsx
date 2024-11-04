import React, {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import './index.css'

export const SideBurgerMenu = ( {isBurgerMenuVisible, setBurgerMenuVisible} ) => {
    const modalRef = useRef(null);
    const [burgerMenuItems, setBurgerMenuItems] = useState([
      {label: 'Авторизация', path: '/auth'},
      {label: 'Профиль', path: '/profile-page'}
    ]);

    useEffect(() => {
        const clickOutside = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            setBurgerMenuVisible(false);
          }
        }
    
        const escDown = (event) => {
          if (event.key === 'Escape') {
            setBurgerMenuVisible(false);
            document.activeElement.blur();
          }
        };
    
        document.addEventListener('keydown', escDown);
        document.addEventListener('mousedown', clickOutside);
    
        return () => {
          document.removeEventListener('keydown', escDown);
            document.removeEventListener('mousedown', clickOutside);
        };
      }, [isBurgerMenuVisible]);

    return (
        <>
            {isBurgerMenuVisible && (
                <div className='burger-side-menu-overlay'></div>
            )}
            <div
                ref={modalRef}
                className={`burger-side-menu ${isBurgerMenuVisible ? 'visible' : ''}`}>
                <ul>
                    {burgerMenuItems.map((menuItem, index) => (
                        <Link to={menuItem.path} key={index}>
                            <li>
                                {menuItem.label}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    );
};
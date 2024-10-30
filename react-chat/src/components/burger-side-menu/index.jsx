import React, {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import './index.css'

export const SideBurgerMenu = ( {isBurgerMenuVisible, setBurgerMenuVisible} ) => {
    const modalRef = useRef(null);
    const [burgerMenuItems, setBurgerMenuItems] = useState(['Страница профиля']);

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
                        <Link to={'/profile-page'} key={index}>
                            <li>
                                {menuItem}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    );
};
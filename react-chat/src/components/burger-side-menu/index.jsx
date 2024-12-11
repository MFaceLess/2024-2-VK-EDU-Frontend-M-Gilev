import React, {useRef, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

import './index.css'

export const SideBurgerMenu = ( {isBurgerMenuVisible, setBurgerMenuVisible} ) => {
    const navigate = useNavigate();

    const modalRef = useRef(null);
    const [burgerMenuItems] = useState([
      {label: 'Авторизация', path: '/auth'},
      {label: 'Профиль', path: '/profile-page'},
      {label: 'Logout', path: '/auth'},
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

    const handleLogout = () => {
      localStorage.clear();
      setBurgerMenuVisible(false);
      navigate('/auth');
    }

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
                        menuItem.label === 'Logout' ? (
                          <li key={index} onClick={handleLogout} className='logoutItem'>
                              {menuItem.label}
                          </li>
                        ) : (
                          <Link to={menuItem.path} key={index}>
                              <li>
                                  {menuItem.label}
                              </li>
                          </Link>
                        )
                    ))}
                </ul>
            </div>
        </>
    );
};

SideBurgerMenu.propTypes = {
  isBurgerMenuVisible: PropTypes.bool,
  setBurgerMenuVisible: PropTypes.func,
};
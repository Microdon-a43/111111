import React from 'react';
import logo from '../../assets/logo.png';
import './header.css';
import { Link } from 'react-router-dom';

export const Header = () => {
  const user = localStorage.getItem('user')
  const parcedUser = JSON.parse(user)
  return (
      <header className="header">
        <div className="container">
          <div className="header__wrap">
            <Link to='/'><img src={logo} alt="" /></Link>
            {
              user ? <h3 className='username'>{parcedUser.userInfo.username}</h3> :
              <button className="header__btn"><Link to='/login'>Войти</Link></button>
            }
            
          </div>
        </div>
      </header>
  );
};

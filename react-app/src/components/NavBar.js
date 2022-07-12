import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {

  return (
    <nav id='navbar'>
      <ul>
        <li id='navbar-left'>
          <div className='home-logo-ctn'>
            <NavLink to='/dashboard' exact={true} activeClassName='active'>
              <img className='home-logo' src={process.env.PUBLIC_URL + '../../../static/timeout-black.png'}></img>
            </NavLink>
          </div>
        </li>
        <li id='navbar-right'>
          <div className='navbar-create-alarm'>
            <NavLink to='/create'>
              <span className="fa-solid fa-plus fa-2x"></span>
            </NavLink>
          </div>
          <div className='navbar-logout'>
            <LogoutButton />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

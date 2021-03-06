import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const currentUser = useSelector(state => state?.session?.user)

  return (
    <nav id='navbar'>
      {currentUser ?
        <ul>
          <>
            <li id='navbar-left'>
              <div className='home-logo-ctn'>
                <NavLink to='/dashboard' exact={true} activeClassName='active'>
                  <img className='home-logo' src={process.env.PUBLIC_URL + '../../../static/timeout-black.png'}></img>
                </NavLink>
              </div>
              <div className='github-logo-ctn'>
                <a href='https://github.com/christopherchueng/Timeout'>
                  <img className='github-logo' src={process.env.PUBLIC_URL + '../../../static/github-logo.png'}></img>
                </a>
              </div>
              <div className='linkedin-logo-ctn'>
                <a href='https://www.linkedin.com/in/christopher-chueng/'>
                  <img className='linkedin-logo' src={process.env.PUBLIC_URL + '../../../static/linkedin-logo.png'}></img>
                </a>
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
          </>
        </ul>
        :
        <div className='auth-home-ctn'>
          <div className='splash-left'>
            <div className='github-logo-ctn'>
              <a href='https://github.com/christopherchueng/Timeout'>
                <img className='github-logo' src={process.env.PUBLIC_URL + '../../../static/github-logo.png'}></img>
              </a>
            </div>
            <div className='linkedin-logo-ctn'>
              <a href='https://www.linkedin.com/in/christopher-chueng/'>
                <img className='linkedin-logo' src={process.env.PUBLIC_URL + '../../../static/linkedin-logo.png'}></img>
              </a>
            </div>
          </div>
          <div className='auth-home'>
            <NavLink to='/'>
              <div className='toggle-home'>
                <span className='home-auth-label'>Home</span>
                <div className='nav-ball'>
                </div>
              </div>
            </NavLink>
          </div>
        </div>}
    </nav>
  );
}

export default NavBar;

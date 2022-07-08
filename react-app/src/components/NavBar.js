
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DemoUserForm from './auth/DemoUserForm';

const NavBar = () => {
  const currentUser = useSelector(state => state?.session?.user)

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/dashboard' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/create'>
            <button><img className='add-alarm-icon' title='Upload' src='../../../static/add-alarm-icon.png'></img></button>
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

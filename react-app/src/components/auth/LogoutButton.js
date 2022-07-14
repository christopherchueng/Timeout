import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return (
    <button className='logout-switch' onClick={onLogout}>
      <span className='logout-span'>Logout</span>
      <div className='logout-ball'></div>
    </button>
    )
};

export default LogoutButton;

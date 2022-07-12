import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    const validationErrors = {}
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/i

    if (!email) {
      validationErrors['email'] = 'Please provide an email.'
    }

    if (!emailRegex.test(email)) {
      validationErrors['email'] = 'Please enter a valid email.'
    }

    if (!password) {
      validationErrors['password'] = 'Please provide a password.'
    }

  }, [email, password])

  const onLogin = async (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div id='login'>
      <form onSubmit={onLogin} className='login-form'>
        {/* ---------------------- EMAIL ---------------------- */}
        <div className='login-email-ctn'>
          {/* <label htmlFor='email'>Email</label> */}
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            className='email-input'
          />
        </div>
        <div className='login-emailError-ctn'>
         {isSubmitted && <ErrorMessage error={errors.email} setClassName="login-emailError" />}
        </div>

        {/* ---------------------- PASSWORD ---------------------- */}
        <div className='login-password-ctn'>
          {/* <label htmlFor='password'>Password</label> */}
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            className='password-input'
          />
        </div>
        <div className='login-pwError-ctn'>
         {isSubmitted && <ErrorMessage error={errors.password} setClassName="login-pwError" />}
        </div>
        <div className='login-btn'>
          <button type='submit' className='toggle-login'>
            <span className='login-span'>Login</span>
            <div className='ball'>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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
      <h1>Sign in to Timeout</h1>
      <form onSubmit={onLogin} className='login-form'>
        {/* ---------------------- EMAIL ---------------------- */}
        <div className='login-email-ctn'>
          <div className='login-email-label'>Email</div>
          <input
            name='email'
            type='text'
            placeholder='you@example.com'
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
          <div className='login-password-label'>Password</div>
          <input
            name='password'
            type='password'
            placeholder='••••••••'
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
            <div className='signin-ball'></div>
          </button>
        </div>
        <div className='create-account-ctn'>
          <Link to='/register'>
            <div className='toggle-create-account'>
              <span className='create-account'>Create an account</span>
              <div className='create-account-ball'></div>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

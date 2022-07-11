import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

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
    <form onSubmit={onLogin}>
      {/* ---------------------- EMAIL ---------------------- */}
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='login-emailError-ctn'>
       {isSubmitted && <ErrorMessage error={errors.email} setClassName="login-emailError" />}
      </div>

      {/* ---------------------- PASSWORD ---------------------- */}
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
      <div className='login-pwError-ctn'>
       {isSubmitted && <ErrorMessage error={errors.password} setClassName="login-pwError" />}
      </div>
      <div className='login-btn'>
        <button type='submit'>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;

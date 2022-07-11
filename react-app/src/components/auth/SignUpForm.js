import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const validationErrors = {}
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/i

    if (!firstName) {
      validationErrors['firstName'] = 'Please provide a first name.'
    }

    if (!lastName) {
      validationErrors['lastName'] = 'Please provide a last name.'
    }

    if (!emailRegex.test(email)) {
      validationErrors['email'] = 'Please enter a valid email.'
    }

    if (password !== repeatPassword) {
      validationErrors['repeatPassword'] = "'Password' and 'Repeat Password' fields did not match."
    }

    setErrors(validationErrors)

  }, [firstName, lastName, email, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    if (password === repeatPassword && errors.length === 0) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setIsSubmitted(false)
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <form onSubmit={onSignUp}>
      {/* --------------------------- FIRST NAME --------------------------- */}
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div className='firstName-error-ctn'>
       {isSubmitted && <ErrorMessage error={errors.firstName} setClassName="firstName-error" />}
      </div>

      {/* --------------------------- LAST NAME --------------------------- */}
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='lastName'
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>
      <div className='lastName-error-ctn'>
       {isSubmitted && <ErrorMessage error={errors.lastName} setClassName="lastName-error" />}
      </div>

      {/* --------------------------- EMAIL --------------------------- */}
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='register-email-error-ctn'>
       {isSubmitted && <ErrorMessage error={errors.email} setClassName="register-email-error" />}
      </div>

      {/* --------------------------- PASSWORD --------------------------- */}
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>

      {/* --------------------------- REPEAT PASSWORD --------------------------- */}
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className='register-pwRepeat-error-ctn'>
       {isSubmitted && <ErrorMessage error={errors.repeatPassword} setClassName="register-pwRepeat-error" />}
      </div>

      <button type='submit' disabled={errors.length}>Sign Up</button>
    </form>
  );
};

export default SignUpForm;

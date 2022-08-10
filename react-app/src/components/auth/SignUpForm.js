import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from '../../store/session';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { createAlarmlist } from '../../store/alarmlist';
import './SignUpForm.css'

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory()

  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false)
  const user = useSelector(state => state.session.user);

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

    if (password.length === 0) {
      validationErrors['password'] = 'Please provide a password.'
    }

    if (repeatPassword.length === 0) {
      validationErrors['repeatPassword'] = 'Please provide a password.'
    }

    setErrors(validationErrors)

  }, [firstName, lastName, email, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    if (Object.values(errors).length === 0) {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      }
      const data = await dispatch(signUp(payload));

      if (data) {
        setErrors(data)
      }
      // const alarmlistPayload = {
      //   'name': 'Other',
      //   'toggle': true,
      //   'user_id': user?.id
      // }

      // if (user && Object.values(user).length !== 0) {
      //   await dispatch(createAlarmlist(alarmlistPayload))
      // }
    }

      // await dispatch(signUp(firstName, lastName, email, password));
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

  const onSubmit = async (e) => {
    e.preventDefault()

    await dispatch(login('demo@aa.io', 'password'))
    history.push('/dashboard')
  }

  return (
    <div id='register'>
      <h1>Create an account</h1>
      <p className='required-asterisk'>*Required fields are marked with an asterisk</p>
      <form onSubmit={onSignUp} className='register-form'>
        {/* --------------------------- FIRST NAME --------------------------- */}
        <div className='register-name-ctn'>
          <div className='register-firstName'>
           <div className='register-firstName-label'>First name<span className='required'>*</span></div>
            <input
              type='text'
              name='firstName'
              onChange={updateFirstName}
              value={firstName}
              placeholder='First name'
              className='firstName-input'
              style={{backgroundColor: errors['firstName'] && isSubmitted ? '#FFA194' : ""}}
            />
            <div className='firstName-error-ctn'>
            {isSubmitted && <ErrorMessage error={errors.firstName} setClassName="firstName-error" />}
            </div>
          </div>
          {/* --------------------------- LAST NAME --------------------------- */}
          <div className='register-lastName'>
            <div className='register-lastName-label'>Last name<span className='required'>*</span></div>
            <input
              type='text'
              name='lastName'
              onChange={updateLastName}
              value={lastName}
              placeholder='Last name'
              className='lastName-input'
              style={{backgroundColor: errors['lastName'] && isSubmitted ? '#FFA194' : ""}}
            />
            <div className='lastName-error-ctn'>
              {isSubmitted && <ErrorMessage error={errors.lastName} setClassName="lastName-error" />}
            </div>
          </div>
        </div>
        {/* --------------------------- EMAIL --------------------------- */}
        <div className='register-email-ctn'>
          <div className='register-email-label'>Email<span className='required'>*</span></div>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder='you@example.com'
            className='email-input'
            style={{backgroundColor: errors['email'] && isSubmitted ? '#FFA194' : ""}}
          />
          <div className='register-email-error-ctn'>
            {isSubmitted && <ErrorMessage error={errors.email} setClassName="register-email-error" />}
          </div>
        </div>
        {/* --------------------------- PASSWORD --------------------------- */}
        <div className='register-password-ctn'>
          <div className='register-password'>
            <div className='register-password-label'>Password<span className='required'>*</span></div>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder='••••••••'
              className='password-input'
              style={{backgroundColor: errors['password'] && isSubmitted ? '#FFA194' : ""}}
            />
            <div className='register-password-error-ctn'>
              {isSubmitted && <ErrorMessage error={errors.password} setClassName="register-password-error" />}
            </div>
          </div>
          {/* --------------------------- REPEAT PASSWORD --------------------------- */}
          <div className='register-repeat'>
            <div className='register-repeat-label'>Repeat password<span className='required'>*</span></div>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              placeholder='Repeat password'
              // required={true}
              className='password-input'
              style={{backgroundColor: errors['repeatPassword'] && isSubmitted ? '#FFA194' : ""}}
            />
            <div className='register-pwRepeat-error-ctn'>
              {isSubmitted && <ErrorMessage error={errors.repeatPassword} setClassName="register-pwRepeat-error" />}
            </div>
          </div>
        </div>

        <div className='register-submit-btn'>
          <button type='submit' className='toggle-register'>
            <span className='register-span'>Sign Up</span>
            <div className='register-ball'></div>
          </button>
        </div>
        <div className='login-ctn'>
          <Link to='/login'>
            <div className='toggle-create-account'>
              <span className='create-account'>Already have an account? Sign in!</span>
              <div className='create-account-ball'></div>
            </div>
          </Link>
        </div>
        <div className='login-demo-ctn'>
          <button className='toggle-login' onClick={onSubmit}>
            <span className='login-span'>Demo</span>
            <div className='signin-ball'></div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;

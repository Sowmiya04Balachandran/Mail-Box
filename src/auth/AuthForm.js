import React, { useState, useRef } from 'react';
import classes from './AuthForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';

const AuthForm = () => {
  const dispatch = useDispatch();

  // switch between login and signup page
  const [isLogin, setIsLogin] = useState(true);

  // loading while submitting the request
  const [isLoading, setIsLoading] = useState(false);

  // to get values
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const ConfirmPasswordInputRef = useRef();

  // to navigate to another page
  const navigate = useNavigate();

  // form submission function
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('you clicked submit button... ');

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    localStorage.setItem('email', enteredEmail);

    setIsLoading(true);

    // link for signup and login
    let url;

    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4mcS-F5h8tJYVTPw1pFJM93TgPV1YzQ8';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4mcS-F5h8tJYVTPw1pFJM93TgPV1YzQ8';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          if (!res.ok) {
            return res.json().then((data) => {
              let errorMessage = 'Authentication Unsuccessful';
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        }
      })
      .then((data) => {
        dispatch(authActions.login(data.idToken));
        console.log(data);
        navigate('/composeemail');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const switchAuthModehandler = () => {
    // set the login or signup button
    setIsLogin((prevstate) => !prevstate);
  };

  return (
    <div>
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input type="email" id="email" ref={emailInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input type="password" id="password" ref={passwordInputRef} required />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="password"
                ref={ConfirmPasswordInputRef}
                required
              />
            </div>
          )}
          <div className={classes.action}>
            {!isLoading && (
              <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            )}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModehandler}
            >
              {isLogin ? 'Create New Account' : 'Login With Existing Account'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AuthForm;

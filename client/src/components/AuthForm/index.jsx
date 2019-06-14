import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import style from './AuthForm.module.scss';

const AuthForm = (props) => {
  const [state, setState] = useState({
    username: '',
    department: '',
    password: '',
  });

  let { method } = props.match.params;

  const handleSubmit = (event) => {
    event.preventDefault();
    method = !(method === 'login' || method === 'register') ? 'login' : method;
    props.handleSubmit(method, state);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className={style.AuthForm_container}>
      {
        (method !== 'login' || method !== 'register') && <Redirect to='/auth/login' />
      }
      {
        props.loggedIn && <Redirect to='/users' />
      }
      <form onSubmit={handleSubmit} className={style.AuthForm}>
        <h4>{ method === 'login' ? 'Login' : 'Register' }</h4>
        <input id='username' name="username" onChange={handleOnChange} value={state.username} type="text" placeholder='Username'/>
        {
          method === 'register'
            && <input
              id='department'
              name="department"
              onChange={handleOnChange}
              value={state.department}
              placeholder='Department'
              type="text"
            />
        }
        <input id='password' name="password" onChange={handleOnChange} value={state.password} type="password" placeholder='Password'/>
        <input type="submit" value={ method === 'login' ? 'Login' : 'Register' } />
      </form>
    </div>
  );
}
 
export default AuthForm;

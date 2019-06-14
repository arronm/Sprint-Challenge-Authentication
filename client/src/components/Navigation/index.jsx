import React from 'react';
import { Link } from 'react-router-dom';

import style from './Navigation.module.scss';

const Navigation = (props) => {
  const handleLogout = (event) => {
    event.preventDefault();
    props.handleLogout();
  };

  return (
    <div className={style.Navigation_container}>
      <div className={style.Navigation}>
      {
        props.loggedIn
          ? <Link to='/auth/login' onClick={handleLogout}>Logout</Link>
          : <Link to='/auth/login'>Login</Link>
      }
      {
        !props.loggedIn && <Link to='/auth/register'>Register</Link>
      }
      {
        props.loggedIn && <Link to='/jokes'>Jokes</Link>
      }
    </div>
    </div>
  );
}
 
export default Navigation;

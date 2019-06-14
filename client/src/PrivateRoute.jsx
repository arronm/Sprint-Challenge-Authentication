import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAuth } from './helpers/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (getAuth()) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/auth/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;

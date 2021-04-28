/**
 *
 * ProtectedRoute
 *
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../selectors';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ component: Component, ...rest }) {
  const { authInfo } = useSelector(selectAuth);

  return (
    <>
      <Route
        {...rest}
        render={props =>
          authInfo !== null ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    </>
  );
}

/**
 *
 * RedirectIfAuth
 *
 */

import React from 'react';
import { useSelector } from 'react-redux';

import { selectAuth } from '../../selectors';
import { Route, Redirect } from 'react-router-dom';

export function RedirectIfAuth({ children, ...rest }) {
  const auth = useSelector(selectAuth);
  const { authInfo } = auth;

  return (
    <Route
      {...rest}
      render={() =>
        authInfo === null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
}

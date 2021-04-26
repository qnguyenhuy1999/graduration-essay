/**
 *
 * Auth
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import { selectAuth } from './selectors';
import { authSaga } from './saga';
import { RedirectIfAuth } from './components/RedirectIfAuth';
import { ProtectedRoute } from './components/ProtectedRoute';

export function Auth(props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: authSaga });

  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCurrentUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return auth.isAuthLoaded ? props.children : <div />;
}

export { RedirectIfAuth, ProtectedRoute };

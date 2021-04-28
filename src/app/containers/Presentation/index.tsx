/**
 *
 * Presentation
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectPresentation } from './selectors';
import { presentationSaga } from './saga';
import { ProtectedLayout } from '../ProtectedLayout';

export const Presentation = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: presentationSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const presentation = useSelector(selectPresentation);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <ProtectedLayout>
      <Helmet>
        <title>Presentation</title>
        <meta name="description" content="Description of Presentation" />
      </Helmet>

      <div>Presentation view</div>
    </ProtectedLayout>
  );
};

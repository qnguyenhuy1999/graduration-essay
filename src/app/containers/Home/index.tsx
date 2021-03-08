/**
 *
 * Home
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectHome } from './selectors';
import { homeSaga } from './saga';

import { Header } from 'app/components/Header';
import { Element } from './components/element';

export const Home = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homeSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const home = useSelector(selectHome);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <HomeWrapper>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>

      <Header />

      <Element />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

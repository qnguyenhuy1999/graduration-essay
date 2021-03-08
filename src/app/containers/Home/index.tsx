/**
 *
 * Home
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectHome } from './selectors';
import { homeSaga } from './saga';

import { Header } from 'app/components/Header';
import { Button, Flex } from 'app/components/Common';
import { Element } from './components/element';
import { NodeElement } from 'types/element';
import { getData as getDataFromLocal } from 'lib/helpers/localStorage';

export const Home = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homeSaga });

  const { listElements } = useSelector(selectHome);
  const dispatch = useDispatch();

  const local_listElements: NodeElement[] = getDataFromLocal('elements') || [];

  useEffect(() => {
    if (local_listElements.length < 1) {
      const x = window.innerWidth / 2 + 25;
      const y = window.innerHeight / 2 + 25;
      dispatch(actions.initialElement({ x, y }));
    } else {
      dispatch(actions.setListElements({ listElements: local_listElements }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local_listElements.length]);

  return (
    <HomeWrapper onDragOver={e => e.preventDefault()}>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>

      <Header />

      <Flex
        justifyContent="flex-end"
        mt="m"
        mr="m"
        onClick={() => dispatch(actions.resetState())}
      >
        <Button variant="primary">Reset</Button>
      </Flex>

      {listElements.length > 0 &&
        listElements.map((element, index) => (
          <Element element={element} key={index} />
        ))}
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

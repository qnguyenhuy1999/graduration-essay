/**
 *
 * Home
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import { selectHome } from './selectors';
import { homeSaga } from './saga';
import { Flex, Span } from '../../components';
import { Slide } from './components/Slide';

interface Props {}

export function Home(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homeSaga });

  const { slides, loading } = useSelector(selectHome);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getSlides());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      {loading ? (
        <Span variant="body">Loading....</Span>
      ) : (
        slides.map(slide => (
          <Flex flexWrap="wrap" key={slide.id}>
            <Slide name={slide.name} status={slide.status} />
          </Flex>
        ))
      )}
    </>
  );
}

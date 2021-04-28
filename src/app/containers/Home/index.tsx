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
import { Flex, H4, Span } from '../../components';
import { Slide } from './components/Slide';
import { ProtectedLayout } from '../ProtectedLayout';

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
    <ProtectedLayout>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <div className="mt-4">
        <H4 mb="l">List slide</H4>
        <Flex flexWrap="wrap">
          {loading ? (
            <Span variant="body">Loading....</Span>
          ) : (
            slides.map(slide => (
              <Slide
                name={slide.name}
                status={slide.status}
                id={slide.id}
                key={slide.id}
              />
            ))
          )}
        </Flex>
      </div>
    </ProtectedLayout>
  );
}

/**
 *
 * Home
 *
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import { selectHome } from './selectors';
import { homeSaga } from './saga';
import { Button, Flex, H4, Span } from '../../components';
import { Slide } from './components/Slide';
import { ProtectedLayout } from '../ProtectedLayout';
import { ModalCreateSlide } from './components/ModalCreateSlide';
import ToastAlert from 'lib/services/alert.service';

export function Home() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homeSaga });

  const { slides, loading, error, createSlideResult } = useSelector(selectHome);
  const dispatch = useDispatch();
  const [isShowModalCreateSlide, setIsShowModalCreateSlide] = useState(false);

  useEffect(() => {
    dispatch(actions.getSlides());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (createSlideResult) {
      onCloseModalCreateSlide();
      ToastAlert.success('Create new slide successfully');
      dispatch(actions.resetStateResult());
    }

    if (error) {
      ToastAlert.error(error);
      dispatch(actions.resetStateResult());
    }
  }, [createSlideResult, dispatch, error]);

  const onCloseModalCreateSlide = () => {
    setIsShowModalCreateSlide(false);
  };

  return (
    <ProtectedLayout>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <div className="mt-4">
        <Flex alignItems="center" justifyContent="space-between">
          <H4 mb="l">List slide</H4>
          <Button
            variant="primary"
            onClick={() => setIsShowModalCreateSlide(true)}
          >
            Create new slide
          </Button>
        </Flex>
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

      <ModalCreateSlide
        visible={isShowModalCreateSlide}
        handleClose={onCloseModalCreateSlide}
      />
    </ProtectedLayout>
  );
}

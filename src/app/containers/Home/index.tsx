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
import { Button, Flex, H4, Link, Span } from '../../components';
import { Slide } from './components/Slide';
import { ProtectedLayout } from '../ProtectedLayout';
import { ModalCreateSlide } from './components/ModalCreateSlide';
import ToastAlert from 'lib/services/alert.service';

export function Home() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homeSaga });

  const {
    slides,
    loading,
    error,
    createSlideResult,
    updateSlideResult,
    removeSlideResult,
  } = useSelector(selectHome);
  const dispatch = useDispatch();
  const [infoModalCUSlide, setInfoModalCUSlide] = useState<any>(null);

  useEffect(() => {
    dispatch(actions.getSlides());
    return () => {
      dispatch(actions.resetState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (createSlideResult) {
      closeModalCUSlide();
      ToastAlert.success('Create new slide successfully');
      dispatch(actions.resetStateResult());
    }

    if (updateSlideResult) {
      closeModalCUSlide();
      ToastAlert.success('Update slide successfully');
      dispatch(actions.resetStateResult());
    }

    if (removeSlideResult) {
      ToastAlert.success('Remove slide successfully');
      dispatch(actions.resetStateResult());
    }

    if (error) {
      ToastAlert.error(error);
      dispatch(actions.resetStateResult());
    }
  }, [
    createSlideResult,
    dispatch,
    error,
    removeSlideResult,
    updateSlideResult,
  ]);

  const closeModalCUSlide = () => {
    setInfoModalCUSlide({ isVisible: false, data: null });
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
          <Flex alignItems="center">
            <Button
              variant="primary"
              mr="s"
              onClick={() =>
                setInfoModalCUSlide({ isVisible: true, data: null })
              }
            >
              Create new slide
            </Button>
            <Button variant="warning">
              <Link to="/trash" color="primaryWhite">
                Trash
              </Link>
            </Button>
          </Flex>
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
                setInfoModalCUSlide={setInfoModalCUSlide}
              />
            ))
          )}
        </Flex>
      </div>

      <ModalCreateSlide
        infoModalCUSlide={infoModalCUSlide}
        handleClose={closeModalCUSlide}
      />
    </ProtectedLayout>
  );
}

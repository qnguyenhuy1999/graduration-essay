/**
 *
 * Trash
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import { selectTrash } from './selectors';
import { trashSaga } from './saga';
import { Flex, H4, Link, Span } from '../../components';
import { TrashSlide } from '../Home/components/Slide';
import { ProtectedLayout } from '../ProtectedLayout';
import ToastAlert from 'lib/services/alert.service';
import { IconWrapper } from '../../components/Icon';
import { ArrowLeft } from '../../components/Icon/Common';

interface Props {}

export function Trash(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: trashSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, slides, reOpenSlideResult, error } = useSelector(
    selectTrash,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getSlideInTrash());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reOpenSlideResult) {
      ToastAlert.success('Reopen slide successfully');
      dispatch(actions.resetStateResult());
    }

    if (error) {
      ToastAlert.error(error);
      dispatch(actions.resetStateResult());
    }
  }, [dispatch, error, reOpenSlideResult]);

  return (
    <ProtectedLayout>
      <Helmet>
        <title>Trash</title>
        <meta name="description" content="Description of Trash" />
      </Helmet>
      <div className="mt-4">
        <Flex alignItems="center">
          <H4 mb="l">
            <Link to="/">
              <IconWrapper size="small" icon={ArrowLeft} mr="s" />
            </Link>
            List trash slide
          </H4>
        </Flex>
        <Flex flexWrap="wrap">
          {loading ? (
            <Span variant="body">Loading....</Span>
          ) : (
            slides.map(slide => (
              <TrashSlide
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

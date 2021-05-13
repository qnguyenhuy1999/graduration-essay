/**
 *
 * Editor
 *
 */

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectEditor } from './selectors';
import { editorSaga } from './saga';

import { Button } from 'app/components/Common';
import { Element } from './components/Element';
import { Line } from './components/Line';
import { ProtectedLayout } from '../ProtectedLayout';
import ToastAlert from 'lib/services/alert.service';
import { generateLines } from 'lib/helpers/line';

export const Editor = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: editorSaga });

  const {
    listElements,
    listLines,
    createElementResult,
    removeElementResult,
    resetSlideResult,
    removeLineResult,
    error,
  } = useSelector(selectEditor);
  const dispatch = useDispatch();
  const { slideId } = useParams<{ slideId: string }>();

  useEffect(() => {
    dispatch(actions.getListElements({ slideId }));
    // eslint-disable-next-Line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(actions.setListLines(generateLines(listElements)));
    // eslint-disable-next-Line react-hooks/exhaustive-deps
  }, [listElements]);

  useEffect(() => {
    if (createElementResult) {
      ToastAlert.success('Element successfully created');
      dispatch(actions.resetStateResult());
    }

    if (removeElementResult) {
      ToastAlert.success('Element successfully deleted');
      dispatch(actions.resetStateResult());
    }

    if (resetSlideResult) {
      ToastAlert.success('Element successfully reset');
      dispatch(actions.resetStateResult());
    }

    if (removeLineResult) {
      ToastAlert.success('Line successfully deleted');
      dispatch(actions.resetStateResult());
    }

    if (error) {
      ToastAlert.error(error);
      dispatch(actions.resetStateResult());
    }
  }, [
    createElementResult,
    dispatch,
    error,
    removeElementResult,
    removeLineResult,
    resetSlideResult,
    slideId,
  ]);

  return (
    <ProtectedLayout>
      <HomeWrapper>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of Home" />
        </Helmet>

        <ButtonWrapper
          onClick={() => dispatch(actions.resetSlide({ slideId }))}
        >
          <Button variant="primary">Reset</Button>
        </ButtonWrapper>

        {listElements.length > 0 &&
          listElements.map(element => (
            <Element
              element={element}
              slideId={slideId}
              key={element.elementId}
            />
          ))}

        <svg width="100%" height="100%">
          <marker
            id="markerCircle"
            markerWidth="6"
            markerHeight="6"
            refY="3"
            refX="3"
          >
            <circle
              cx="3"
              cy="3"
              r="3"
              style={{ stroke: 'none', fill: '#2f8ec4' }}
            />
          </marker>

          {listLines.length > 0 &&
            listLines.map((line, index) => <Line line={line} key={index} />)}
        </svg>
      </HomeWrapper>
    </ProtectedLayout>
  );
};

const HomeWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 0;
`;

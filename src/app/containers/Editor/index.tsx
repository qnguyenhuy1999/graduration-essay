/**
 *
 * Editor
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectEditor } from './selectors';
import { editorSaga } from './saga';

import { Button } from 'app/components/Common';
import { Element } from './components/element';
import { NodeElement } from 'types/element';
import { getData as getDataFromLocal } from 'lib/helpers/localStorage';
import { Line } from './components/line';

export const Editor = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: editorSaga });

  const { listElements, listLines } = useSelector(selectEditor);
  const dispatch = useDispatch();

  const local_listElements: NodeElement[] = getDataFromLocal('elements') || [];

  useEffect(() => {
    if (local_listElements.length < 1) {
      const x = window.innerWidth / 2 + 25;
      const y = window.innerHeight / 2 - 25;
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

      <ButtonWrapper onClick={() => dispatch(actions.resetState())}>
        <Button variant="primary">Reset</Button>
      </ButtonWrapper>

      {listElements.length > 0 &&
        listElements.map((element, index) => (
          <Element element={element} key={index} />
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
  );
};

const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

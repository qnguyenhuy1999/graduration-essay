/**
 *
 * Editor
 *
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectEditor } from './selectors';
import { editorSaga } from './saga';

import { Button, H5 } from 'app/components/Common';
import { Element } from './components/Element';
import { Line } from './components/Line';
import { ProtectedLayout } from '../ProtectedLayout';
import ToastAlert from 'lib/services/alert.service';
import { generateLines } from 'lib/helpers/line';
import { CloneElement } from 'types/element';

export const Editor = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: editorSaga });

  const {
    infoSlideDetail,
    listElements,
    listLines,
    createElementResult,
    updateElementResult,
    removeElementResult,
    resetSlideResult,
    removeLineResult,
    createLineResult,
    error,
  } = useSelector(selectEditor);
  const dispatch = useDispatch();
  let numberCloneRef: React.MutableRefObject<HTMLElement | null> | null = useRef(
    null,
  );
  const { slideId } = useParams<{ slideId: string }>();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [numberClone, setNumberClone] = useState<number>(0);
  const [cloneElement, setCloneElement] = useState<CloneElement | null>(null);

  useEffect(() => {
    dispatch(actions.getListElements({ slideId }));
    return () => {
      dispatch(actions.resetState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(actions.setListLines(generateLines(listElements)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listElements]);

  useEffect(() => {
    if (createElementResult) {
      ToastAlert.success('Element successfully created');
      dispatch(actions.resetStateResult());
    }

    if (updateElementResult) {
      if (updateElementResult.type === 'edit') {
        ToastAlert.success('Element successfully updated');
      }
      dispatch(actions.resetStateResult());
    }

    if (removeElementResult) {
      ToastAlert.success('Element successfully deleted');
      dispatch(actions.resetStateResult());
    }

    if (resetSlideResult) {
      ToastAlert.success('Slide successfully reset');
      dispatch(actions.resetStateResult());
    }

    if (removeLineResult) {
      ToastAlert.success('Line successfully deleted');
      dispatch(actions.resetStateResult());
    }

    if (createLineResult) {
      ToastAlert.success('Line successfully linked');
      dispatch(actions.resetStateResult());
    }

    if (error) {
      ToastAlert.error(error);
      dispatch(actions.resetStateResult());
    }
  }, [
    createElementResult,
    createLineResult,
    dispatch,
    error,
    removeElementResult,
    removeLineResult,
    resetSlideResult,
    slideId,
    updateElementResult,
  ]);

  const makeClone = (number: number, sourceCloneElement: CloneElement) => {
    setNumberClone(number);
    setCloneElement(sourceCloneElement);
  };

  const saveClone = (targetCloneElement: CloneElement) => {
    dispatch(
      actions.createLine({
        eSource: cloneElement?.elementId || '',
        nSource: cloneElement?.nodeId || '',
        eTarget: targetCloneElement?.elementId || '',
        nTarget: targetCloneElement?.nodeId || '',
      }),
    );
  };

  const handleStop = e => {
    setNumberClone(0);
    setCloneElement(null);
    numberCloneRef = null;
    document.removeEventListener('mousemove', dragElement);
    document.removeEventListener('mouseup', handleStop);
  };

  const dragElement = useCallback(
    e => {
      if (numberClone && cloneElement && e.shiftKey) {
        setCloneElement({
          ...cloneElement,
          position: {
            x: e.pageX - 50,
            y: e.pageY - 50,
          },
        });
      }
    },
    [cloneElement, numberClone],
  );

  useEffect(() => {
    if (numberCloneRef?.current) {
      const drag = () => {
        document.addEventListener('mousemove', dragElement);
        document.addEventListener('mouseup', handleStop);
      };
      numberCloneRef?.current?.addEventListener('mousedown', drag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragElement, numberCloneRef]);

  return (
    <ProtectedLayout>
      <HomeWrapper>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of Home" />
        </Helmet>

        <Wrapper>
          <H5 mb="0">{infoSlideDetail?.name}</H5>
          <Button
            variant="primary"
            ml="m"
            onClick={() => dispatch(actions.resetSlide({ slideId }))}
          >
            Reset
          </Button>
        </Wrapper>

        {listElements.length > 0 &&
          listElements.map(element => (
            <Element
              element={element}
              slideId={slideId}
              key={element.elementId}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              makeClone={makeClone}
              saveClone={saveClone}
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

        {numberClone && cloneElement?.elementId && (
          <CloneStyled ref={numberCloneRef} position={cloneElement?.position}>
            {numberClone}
          </CloneStyled>
        )}
      </HomeWrapper>
    </ProtectedLayout>
  );
};

const HomeWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 15px;
  right: 0;
`;

const CloneStyled = styled.div<any>`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.primaryBlue};
  color: ${props => props.theme.colors.primaryWhite};
  top: ${props => props.position?.y}px;
  left: ${props => props.position?.x}px;
  transform: translate(calc(-150% + 10px), calc(-150% + 5px)) !important;
  z-index: 10;
`;

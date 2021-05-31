/**
 *
 * Presentation
 *
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import {
  actions as editorActions,
  reducer as editorReducer,
  sliceKey as editorSlideKey,
} from 'app/containers/Editor/slice';
import { presentationSaga } from './saga';
import { editorSaga } from 'app/containers/Editor/saga';
import { ProtectedLayout } from '../ProtectedLayout';
import { selectEditor } from '../Editor/selectors';
import { PresentationView } from './components/PresentationView';
import { DirectionButtons } from './components/DirectionButtons';
import { generateLines } from 'lib/helpers/line';
import { MiniMap } from './components/MiniMap';
import { convertNumberToDirection } from 'lib/helpers/element';

export const Presentation = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: presentationSaga });
  useInjectReducer({ key: editorSlideKey, reducer: editorReducer });
  useInjectSaga({ key: editorSlideKey, saga: editorSaga });

  const dispatch = useDispatch();
  const history = useHistory();
  const { location } = history;
  const { slideId } = useParams<{ slideId: string }>();
  const { listElements } = useSelector(selectEditor);
  const { listLines } = useSelector(selectEditor);
  const [nextDirection, setNextDirection] = useState<string>('');
  const [currentElement, setCurrentElement] = useState<any>(null);

  useEffect(() => {
    dispatch(editorActions.getListElements({ slideId }));
    return () => {
      dispatch(editorActions.resetState());
      setNextDirection('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(editorActions.setListLines(generateLines(listElements)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listElements]);

  useEffect(() => {
    const currentSlideId = location.search.split('currentItem=')[1];
    const currentElement =
      listElements.find(element => element.elementId === currentSlideId) ||
      listElements[0];
    setCurrentElement(currentElement);
  }, [listElements, location.search]);

  const handleDirection = useCallback(
    ({ key }) => {
      const linkedNode = currentElement?.nodes?.find(
        node => node.nodeNumber === Number(key) && node.linkId !== 'empty',
      );

      if (linkedNode) {
        const line = listLines.find(line => line.linkId === linkedNode.linkId);
        const nextItem =
          line?.from === currentElement?.elementId ? line?.to : line?.from;

        if (nextItem) {
          history.push(
            `/slide/${slideId}/presentation?currentItem=${nextItem}`,
          );
          setNextDirection(convertNumberToDirection(key));
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentElement, slideId],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleDirection);
    const timeout = setTimeout(() => {
      setNextDirection('');
    }, 2000);
    return () => {
      document.removeEventListener('keydown', handleDirection);
      clearTimeout(timeout);
    };
  }, [handleDirection, setNextDirection]);

  return (
    <ProtectedLayout>
      <Helmet>
        <title>Presentation</title>
        <meta name="description" content="Description of Presentation" />
      </Helmet>

      <div className="mt-5">
        <PresentationView
          element={currentElement}
          nextDirection={nextDirection}
        />
        <MiniMap currentElement={currentElement} />
        <DirectionButtons
          nodes={currentElement?.nodes}
          slideId={slideId}
          elementId={currentElement?.elementId}
          setNextDirection={setNextDirection}
        />
      </div>
    </ProtectedLayout>
  );
};

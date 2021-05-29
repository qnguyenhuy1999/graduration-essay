/**
 *
 * Presentation
 *
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import {
  actions,
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
import { generateLines } from '../../../lib/helpers/line';
import { MiniMap } from './components/MiniMap';

export const Presentation = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: presentationSaga });
  useInjectReducer({ key: editorSlideKey, reducer: editorReducer });
  useInjectSaga({ key: editorSlideKey, saga: editorSaga });

  const dispatch = useDispatch();
  const { location } = useHistory();
  const { slideId } = useParams<{ slideId: string }>();
  const { listElements } = useSelector(selectEditor);
  const [nextDirection, setNextDirection] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNextDirection('');
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  });

  useEffect(() => {
    dispatch(editorActions.getListElements({ slideId }));
    return () => {
      dispatch(actions.resetState());
      setNextDirection('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(actions.setListLines(generateLines(listElements)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listElements]);

  const currentSlideId = location.search.split('currentItem=')[1];
  const currentElement =
    listElements.find(element => element.elementId === currentSlideId) ||
    listElements[0];

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

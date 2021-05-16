import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

import { selectEditor } from 'app/containers/Editor/selectors';
import { MiniMapElement } from './components/MiniMapElement';
import { Line } from 'app/containers/Editor/components/Line';
import { Element } from 'types/element';

interface Props {
  currentElement: Element;
}

export function MiniMap(props: Props) {
  const { currentElement } = props;
  const { listElements, listLines } = useSelector(selectEditor);
  return (
    <MiniMapWrapper>
      {listElements.length > 0 &&
        listElements.map(element => (
          <MiniMapElement
            element={element}
            key={element.elementId}
            currentElementId={currentElement?.elementId}
          />
        ))}

      <svg width="100%" height="100%">
        {listLines.length > 0 &&
          listLines.map((line, index) => <Line line={line} key={index} />)}
      </svg>
    </MiniMapWrapper>
  );
}

const MiniMapWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  background-color: whitesmoke;
  top: 80px;
  right: -82%;
  box-shadow: 3px 5px 11px rgba(1, 1, 1, 0.5);
  width: 100%;
  height: 100%;
  transform-origin: left top;
  transform: scale(0.15);
`;

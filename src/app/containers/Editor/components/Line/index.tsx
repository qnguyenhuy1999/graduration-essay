import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import ClickAwayListener from 'react-click-away-listener';

import { Line as LineType } from 'types/line';
import { Position } from 'types/element';
import { selectEditor } from '../../selectors';
import { getElementAndNodeForLine, getPosLink } from 'lib/helpers/line';
import { convertNumberToDirection } from 'lib/helpers/element';
import { actions } from '../../slice';

interface Props {
  line: LineType;
}

const linkSelectedLink = {
  stroke: 'red',
  strokeDasharray: 10,
  animation: 'selectLink 20s linear infinite',
};

export const Line = (props: Props) => {
  const { line } = props;
  const [positionStart, setPositionStart] = useState<Position | null>(null);
  const [positionEnd, setPositionEnd] = useState<Position | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { listElements } = useSelector(selectEditor);
  const dispatch = useDispatch();

  useEffect(() => {
    if (listElements?.length > 0) {
      const { element, node, _element, _node } = getElementAndNodeForLine(
        listElements,
        line,
      );

      const calcPosStart =
        element &&
        node &&
        getPosLink(element, convertNumberToDirection(node.nodeNumber));
      setPositionStart(calcPosStart || null);

      const calcPosEnd =
        _element &&
        _node &&
        getPosLink(_element, convertNumberToDirection(_node.nodeNumber));
      setPositionEnd(calcPosEnd || null);
    }
  }, [line, listElements]);

  return (
    <ClickAwayListener onClickAway={() => setIsSelected(false)}>
      <LineStyled
        markerStart="url(#markerCircle)"
        markerEnd="url(#markerCircle)"
        x1={positionStart?.x}
        y1={positionStart?.y}
        x2={positionEnd?.x}
        y2={positionEnd?.y}
        onClick={() => setIsSelected(!isSelected)}
        onKeyDown={e => {
          if (isSelected && (e.key === 'Delete' || e.key === 'Backspace')) {
            dispatch(actions.removeLine({ linkId: line.linkId }));
          }
        }}
        style={isSelected ? linkSelectedLink : null}
        tabIndex="0"
      />
    </ClickAwayListener>
  );
};

export const LineStyled = styled.line<any>`
  stroke: ${p => p.theme.colors.primaryBlack};
  stroke-width: 3px;
  cursor: pointer;
  animation: initLink 0.5s forwards;

  :focus {
    outline: none;
  }

  @keyframes selectLink {
    to {
      stroke-dashoffset: -100%;
    }
  }
`;

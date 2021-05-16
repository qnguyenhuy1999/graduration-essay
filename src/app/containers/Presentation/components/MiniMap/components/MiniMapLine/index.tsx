import React, { useEffect, useState } from 'react';

import { Position } from 'types/element';
import { Line as LineType } from 'types/line';
import { selectEditor } from 'app/containers/Editor/selectors';
import { LineStyled } from 'app/containers/Editor/components/Line';
import { getElementAndNodeForLine, getPosLink } from 'lib/helpers/line';
import { convertNumberToDirection } from 'lib/helpers/element';
import { useSelector } from 'react-redux';

interface Props {
  line: LineType;
}

export function MiniMapLine(props: Props) {
  const { line } = props;
  const [positionStart, setPositionStart] = useState<Position | null>(null);
  const [positionEnd, setPositionEnd] = useState<Position | null>(null);
  const { listElements } = useSelector(selectEditor);

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
    <LineStyled
      markerStart="url(#markerCircle)"
      markerEnd="url(#markerCircle)"
      x1={positionStart?.x}
      y1={positionStart?.y}
      x2={positionEnd?.x}
      y2={positionEnd?.y}
      tabIndex="0"
    />
  );
}

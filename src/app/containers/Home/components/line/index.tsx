import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Line as LineType } from 'types/line';
import { Position } from 'types/element';
import { selectHome } from '../../selectors';
import { getPosLink } from 'lib/helpers/line';
import styled from '@emotion/styled';

interface Props {
  line: LineType;
}

export const Line = (props: Props) => {
  const { line } = props;
  const [positionStart, setPositionStart] = useState<Position | null>(null);
  const [positionEnd, setPositionEnd] = useState<Position | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { listElements } = useSelector(selectHome);

  useEffect(() => {
    if (listElements?.length > 0) {
      const mainElement = listElements.find(
        element => element.id === line?.mainId,
      );
      const calcPosStart = getPosLink(mainElement, line.mainDirection);
      setPositionStart(calcPosStart);
      const extraElement = listElements.find(
        element => element.id === line?.extraId,
      );
      const calcPosEnd = getPosLink(extraElement, line.extraDirection);
      setPositionEnd(calcPosEnd);
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
      onClick={() => setIsSelected(!isSelected)}
    />
  );
};

const LineStyled = styled.line<any>`
  stroke: ${p => p.theme.colors.primaryBlack};
  stroke-width: 3px;
  cursor: pointer;
`;

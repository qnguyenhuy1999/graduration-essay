import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import { Button } from 'app/components';
import { Node } from 'types/element';
import { selectEditor } from 'app/containers/Editor/selectors';
import { convertNumberToDirection } from 'lib/helpers/element';

interface Props {
  nodes: Node[];
  slideId: string;
  elementId: string;
  setNextDirection: any;
}

export function DirectionButtons(props: Props) {
  const { nodes, slideId, elementId, setNextDirection } = props;
  const history = useHistory();
  const { listLines } = useSelector(selectEditor);

  const handleDirection = key => {
    const node = nodes?.find(
      node => node.nodeNumber === Number(key) && node.linkId !== 'empty',
    );

    if (node) {
      const line = listLines.find(line => line.linkId === node.linkId);
      const currentItem = line?.from === elementId ? line?.to : line?.from;
      history.push(`/slide/${slideId}/presentation?currentItem=${currentItem}`);
    }

    setNextDirection(convertNumberToDirection(key));
  };

  useEffect(() => {
    document.addEventListener('keydown', e => {
      handleDirection(e.key);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const renderDirectionButton = () => {
    const linkedNodes = nodes?.filter(node => node.linkId !== 'empty');
    return (
      linkedNodes?.length > 0 &&
      linkedNodes?.map(linkedNode => {
        const line = listLines.find(line => line.linkId === linkedNode.linkId);
        const currentItem = line?.from === elementId ? line?.to : line?.from;

        return (
          <Button
            key={linkedNode.linkId}
            variant="secondary"
            onClick={() => {
              history.push(
                `/slide/${slideId}/presentation?currentItem=${currentItem}`,
              );
              setNextDirection(convertNumberToDirection(linkedNode.nodeNumber));
            }}
            mb="s"
          >
            {linkedNode.caption}
          </Button>
        );
      })
    );
  };

  return (
    <DirectionButtonStyled>{renderDirectionButton()}</DirectionButtonStyled>
  );
}

const DirectionButtonStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 10px;
  bottom: 20px;
`;

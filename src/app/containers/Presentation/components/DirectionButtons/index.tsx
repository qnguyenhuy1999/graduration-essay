import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import { Button } from 'app/components';
import { Node } from 'types/element';
import { selectEditor } from 'app/containers/Editor/selectors';

interface Props {
  nodes: Node[];
  slideId: string;
  elementId: string;
}

export function DirectionButtons(props: Props) {
  const { nodes, slideId, elementId } = props;
  const history = useHistory();
  const { listLines } = useSelector(selectEditor);

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
            onClick={() =>
              history.push(
                `/slide/${slideId}/presentation?currentItem=${currentItem}`,
              )
            }
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

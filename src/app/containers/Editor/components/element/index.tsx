import React, { useState } from 'react';
import classNames from 'classnames';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { Button, Flex, Span } from 'app/components/Common';
import { IconWrapper } from 'app/components/Icon';
import { Close, Edit } from 'app/components/Icon/Common';
import { Element as ElementType } from 'types/element';
import { actions } from '../../slice';
import ToastAlert from 'lib/services/alert.service';

interface Props {
  element: ElementType;
  slideId: string;
}

export const Element = (props: Props) => {
  const { element, slideId } = props;
  const [isHover, setIsHover] = useState<boolean>(false);
  const dispatch = useDispatch();

  const nodeTop = element.nodes?.find(node => node.nodeNumber === 1);
  const nodeRight = element.nodes?.find(node => node.nodeNumber === 2);
  const nodeBottom = element.nodes?.find(node => node.nodeNumber === 3);
  const nodeLeft = element.nodes?.find(node => node.nodeNumber === 4);

  const createElement = (elementId, node) => {
    if (node.linkId !== 'empty') {
      return ToastAlert.error('Node is already linked');
    }
    dispatch(actions.createElement({ elementId, nodeId: node.id, slideId }));
  };

  const startMove = event => {
    if (!event.shiftKey) {
      document.addEventListener('mousemove', incMove);
      document.addEventListener('mouseup', endMove);
    }
  };

  const incMove = e => {
    // dispatch(
    //   actions.updatePositionElement({ element, x: e.pageX, y: e.pageY }),
    // );
  };

  const endMove = () => {
    document.removeEventListener('mousemove', incMove);
    document.removeEventListener('mouseup', endMove);
  };

  return (
    <ElementContainerItem
      className={classNames('element-container-item', { hover: isHover })}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onDrag={startMove}
      isHover={isHover}
      style={{ left: element?.position.x, top: element?.position.y }}
      draggable="true"
    >
      <NodeElement className="element">
        {nodeTop && (
          <div
            className="path"
            onClick={() => createElement(element.elementId, nodeTop)}
          >
            <Span>1</Span>
          </div>
        )}
        {nodeRight && (
          <div
            className="path"
            onClick={() => createElement(element.elementId, nodeRight)}
          >
            <Span>2</Span>
          </div>
        )}
        {nodeLeft && (
          <div
            className="path"
            onClick={() => createElement(element.elementId, nodeLeft)}
          >
            <Span>4</Span>
          </div>
        )}
        {nodeBottom && (
          <div
            className="path"
            onClick={() => createElement(element.elementId, nodeBottom)}
          >
            <Span>3</Span>
          </div>
        )}
      </NodeElement>

      <Controls justifyContent="space-between" pt="s" className="controls">
        <Button variant="primary" mr="xs">
          <IconWrapper icon={Edit} fill="primaryWhite" />
        </Button>
        <Button
          variant="warning"
          onClick={() =>
            dispatch(
              actions.removeElement({ elementId: element.elementId, slideId }),
            )
          }
        >
          <IconWrapper icon={Close} fill="primaryWhite" />
        </Button>
      </Controls>
    </ElementContainerItem>
  );
};

const ElementContainerItem = styled.div<any>`
  width: 100px;
  height: 100px;
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #fff;
  border: 3px solid;
  cursor: grab;
  .path,
  .controls {
    opacity: ${p => p.isHover && 1};
  }
`;

const NodeElement = styled.div`
  height: 100%;
  border-radius: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1px;
  background: #fff;
  transform: rotate(45deg);
  overflow: hidden;

  .path {
    background: #6fdaeb;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 1s opacity;
  }

  span {
    transform: rotate(-45deg);
  }
`;

const Controls = styled(Flex)`
  width: 105px;
  opacity: 0;
  transition: 1s opacity;
`;

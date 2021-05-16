import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { Button, Flex, Span } from 'app/components/Common';
import { IconWrapper } from 'app/components/Icon';
import { Close, Edit } from 'app/components/Icon/Common';
import { Element as ElementType, Position } from 'types/element';
import { actions } from '../../slice';
import ToastAlert from 'lib/services/alert.service';
import { EditElementModal } from './components/EditElementModal';
import { DragElement } from 'app/components/DragElement';

interface Props {
  element: ElementType;
  slideId: string;
}

export const Element = (props: Props) => {
  const { element, slideId } = props;
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setPosition({
      x: element.position.x,
      y: element.position.y,
    });
  }, [element.position.x, element.position.y]);

  const nodeTop = element.nodes?.find(node => node.nodeNumber === 1);
  const nodeRight = element.nodes?.find(node => node.nodeNumber === 2);
  const nodeBottom = element.nodes?.find(node => node.nodeNumber === 3);
  const nodeLeft = element.nodes?.find(node => node.nodeNumber === 4);

  const createElement = (e, elementId, node) => {
    if (isDragging) return;

    if (node.linkId !== 'empty') {
      return ToastAlert.error('Node is already linked');
    }

    dispatch(actions.createElement({ elementId, nodeId: node.id, slideId }));
  };

  const handleCloseEditModal = () => {
    setIsVisibleModal(false);
  };

  const updateContentElement = payload => {
    const data = {
      position: element.position,
      caption: element.caption,
      status: element.status,
      elementId: element.elementId,
      slideId,
      ...payload,
    };
    dispatch(actions.updateElement(data));
  };

  const handleDrag = position => {
    dispatch(
      actions.setPositionElement({
        ...position,
        elementId: element.elementId,
      }),
    );
  };

  const handleEndMove = position => {
    const data = {
      position,
      caption: element.caption,
      html: element.html,
      status: element.status,
      nodes: element.nodes.map(node => {
        return {
          id: node.id,
          caption: node.caption,
        };
      }),
      elementId: element.elementId,
      slideId,
    };

    dispatch(actions.updateElement(data));
  };

  return (
    <DragElement
      initialPos={position}
      handleDrag={handleDrag}
      handleEndMove={handleEndMove}
      setIsDragging={setIsDragging}
    >
      <ElementContainerItem
        className={classNames('element-container-item', {
          hover: isHover,
        })}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        isHover={isHover}
      >
        <NodeElement className="element">
          {nodeTop && (
            <div
              className="path"
              onClick={e => createElement(e, element.elementId, nodeTop)}
            >
              <Span>1</Span>
            </div>
          )}
          {nodeRight && (
            <div
              className="path"
              onClick={e => createElement(e, element.elementId, nodeRight)}
            >
              <Span>2</Span>
            </div>
          )}
          {nodeLeft && (
            <div
              className="path"
              onClick={e => createElement(e, element.elementId, nodeLeft)}
            >
              <Span>4</Span>
            </div>
          )}
          {nodeBottom && (
            <div
              className="path"
              onClick={e => createElement(e, element.elementId, nodeBottom)}
            >
              <Span>3</Span>
            </div>
          )}
        </NodeElement>

        <Controls justifyContent="space-between" pt="s" className="controls">
          <Button
            variant="primary"
            mr="xs"
            onClick={() => setIsVisibleModal(true)}
          >
            <IconWrapper icon={Edit} fill="primaryWhite" />
          </Button>
          <Button
            variant="warning"
            onClick={() =>
              dispatch(actions.removeElement({ elementId: element.elementId }))
            }
          >
            <IconWrapper icon={Close} fill="primaryWhite" />
          </Button>
        </Controls>
        <EditElementModal
          updateContentElement={updateContentElement}
          element={element}
          visible={isVisibleModal}
          handleClose={handleCloseEditModal}
        />
      </ElementContainerItem>
    </DragElement>
  );
};

export const ElementContainerItem = styled.div<any>`
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
  animation: fadeIn 0.5s forwards;
`;

export const NodeElement = styled.div`
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

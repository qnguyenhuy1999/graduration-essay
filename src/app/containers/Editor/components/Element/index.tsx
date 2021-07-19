import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from 'react-draggable';

import { Button, Flex, Span } from 'app/components/Common';
import { IconWrapper } from 'app/components/Icon';
import { Close, Edit } from 'app/components/Icon/Common';
import { CloneElement, Element as ElementType } from 'types/element';
import { actions } from '../../slice';
import ToastAlert from 'lib/services/alert.service';
import { EditElementModal } from './components/EditElementModal';
import { selectEditor } from '../../selectors';

interface Props {
  element: ElementType;
  slideId: string;
  isDragging: boolean;
  setIsDragging: any;
  makeClone: (number, cloneElement: CloneElement) => void;
  saveClone: any;
}

export const Element = (props: Props) => {
  const {
    element,
    slideId,
    isDragging,
    setIsDragging,
    makeClone,
    saveClone,
  } = props;
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const { updateElementResult } = useSelector(selectEditor);
  const dispatch = useDispatch();

  const nodeTop = element.nodes?.find(node => node.nodeNumber === 1);
  const nodeRight = element.nodes?.find(node => node.nodeNumber === 2);
  const nodeBottom = element.nodes?.find(node => node.nodeNumber === 3);
  const nodeLeft = element.nodes?.find(node => node.nodeNumber === 4);

  useEffect(() => {
    if (updateElementResult) {
      setIsVisibleModal(false);
      dispatch(actions.resetStateResult());
    }
  }, [dispatch, updateElementResult]);

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
      status: element.status,
      elementId: element.elementId,
      slideId,
      type: 'edit',
      ...payload,
    };
    dispatch(actions.updateElement(data));
  };

  const handleDrag = (e, ui) => {
    if (e.type === 'mousemove') {
      const { x, y } = element.position;
      dispatch(
        actions.setPositionElement({
          x: x + ui.deltaX,
          y: y + ui.deltaY,
          elementId: element.elementId,
        }),
      );
      setIsDragging(true);
    }
  };

  const handleStop = e => {
    if (e.type === 'mouseup' && isDragging) {
      const data = {
        position: {
          x: element.position.x,
          y: element.position.y,
        },
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
        type: 'drag',
      };

      dispatch(actions.updateElement(data));
      setTimeout(() => {
        setIsDragging(false);
      }, 500);
    }
  };

  const handleMouseDown = (numberClone, node, e) => {
    if (e.shiftKey) {
      e.stopPropagation();

      if (node.linkId !== 'empty')
        return ToastAlert.error('Node is already linked');

      makeClone(numberClone, {
        position: { x: e.clientX - 50, y: e.clientY - 50 },
        elementId: element.elementId,
        nodeId: node.id,
      });
    }
  };

  const handleMouseUp = (node, e) => {
    if (e.shiftKey) {
      e.stopPropagation();

      if (node.linkId !== 'empty')
        return ToastAlert.error('Node is already linked');

      saveClone({
        position: { x: 0, y: 0 },
        elementId: element.elementId,
        nodeId: node.id,
      });
    }
  };

  return (
    <div>
      <Draggable onStop={handleStop} onDrag={handleDrag}>
        <ElementContainerItem
          className={classNames('element-container-item', {
            hover: isHover,
          })}
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          isHover={isHover}
          position={element.position}
        >
          <NodeElement className="element">
            {nodeTop && (
              <div
                className="path"
                onClick={e => createElement(e, element.elementId, nodeTop)}
                onMouseDown={e => handleMouseDown(1, nodeTop, e)}
                onMouseUp={e => handleMouseUp(nodeTop, e)}
              >
                <Span>1</Span>
              </div>
            )}
            {nodeRight && (
              <div
                className="path"
                onClick={e => createElement(e, element.elementId, nodeRight)}
                onMouseDown={e => handleMouseDown(2, nodeRight, e)}
                onMouseUp={e => handleMouseUp(nodeRight, e)}
              >
                <Span>2</Span>
              </div>
            )}
            {nodeLeft && (
              <div
                className="path"
                onClick={e => createElement(e, element.elementId, nodeLeft)}
                onMouseDown={e => handleMouseDown(4, nodeLeft, e)}
                onMouseUp={e => handleMouseUp(nodeLeft, e)}
              >
                <Span>4</Span>
              </div>
            )}
            {nodeBottom && (
              <div
                className="path"
                onClick={e => createElement(e, element.elementId, nodeBottom)}
                onMouseDown={e => handleMouseDown(3, nodeBottom, e)}
                onMouseUp={e => handleMouseUp(nodeBottom, e)}
              >
                <Span>3</Span>
              </div>
            )}
          </NodeElement>

          <Controls justifyContent="space-between" pt="s" className="controls">
            <Button
              variant="primary"
              mr="xs"
              onClick={() => {
                setIsVisibleModal(true);
                setIsHover(false);
              }}
            >
              <IconWrapper icon={Edit} fill="primaryWhite" />
            </Button>
            <Button
              variant="warning"
              onClick={() =>
                dispatch(
                  actions.removeElement({ elementId: element.elementId }),
                )
              }
            >
              <IconWrapper icon={Close} fill="primaryWhite" />
            </Button>
          </Controls>
        </ElementContainerItem>
      </Draggable>
      <EditElementModal
        updateContentElement={updateContentElement}
        element={element}
        visible={isVisibleModal}
        handleClose={handleCloseEditModal}
      />
    </div>
  );
};

export const ElementContainerItem = styled.div<any>`
  width: 100px;
  height: 100px;
  position: absolute;
  left: ${p => p.position?.x}px;
  top: ${p => p.position?.y}px;
  transform: translate(-50%, -50%) !important;
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

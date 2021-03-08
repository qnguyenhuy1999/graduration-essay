import React, { useState } from 'react';
import classNames from 'classnames';
import styled from '@emotion/styled';

import { Button, Flex, Span } from 'app/components/Common';
import { IconWrapper } from 'app/components/Icon';
import { Close, Edit } from 'app/components/Icon/Common';

export const Element = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <ElementContainerItem
      className={classNames('element-container-item', { hover: isHover })}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      isHover={isHover}
    >
      <NodeElement className="element">
        <div className="path">
          <Span>1</Span>
        </div>
        <div className="path">
          <Span>2</Span>
        </div>
        <div className="path">
          <Span>4</Span>
        </div>
        <div className="path">
          <Span>3</Span>
        </div>
      </NodeElement>

      <Controls justifyContent="space-between" pt="s" className="controls">
        <Button variant="primary" mr="xs">
          <IconWrapper icon={Edit} fill="primaryWhite" />
        </Button>
        <Button variant="warning">
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

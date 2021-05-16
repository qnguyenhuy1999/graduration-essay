import React from 'react';

import { Element } from 'types/element';
import { ElementContainerItem } from 'app/containers/Editor/components/Element';
import theme from 'styles/theme';

interface Props {
  element: Element;
  currentElementId: string;
}

export function MiniMapElement(props: Props) {
  const { element, currentElementId } = props;
  return (
    <ElementContainerItem
      className={'element-container-item'}
      style={{
        left: element.position.x,
        top: element.position.y,
        background:
          currentElementId === element.elementId
            ? theme.colors.redPigment
            : '#fff',
      }}
    />
  );
}

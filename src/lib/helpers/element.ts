import { NodeElement, Position } from 'types/element';
import { Direction } from 'types/line';

const getOppositeDirection = (direction): Direction => {
  switch (direction) {
    case 'top': {
      return 'bottom';
    }
    case 'right': {
      return 'left';
    }
    case 'bottom': {
      return 'top';
    }
    case 'left': {
      return 'right';
    }
    default: {
      return 'top';
    }
  }
};

const getPositionElement = (
  element: NodeElement,
  direction: string,
): Position => {
  const distance = 200;
  const { x, y } = element;
  switch (direction) {
    case 'top': {
      return {
        x,
        y: y - distance,
      };
    }
    case 'right': {
      return {
        x: x + distance,
        y,
      };
    }
    case 'bottom': {
      return {
        x,
        y: y + distance,
      };
    }
    case 'left': {
      return {
        x: x - distance,
        y,
      };
    }

    default: {
      return {
        x,
        y,
      };
    }
  }
};

const newElement = (element, direction): NodeElement => {
  const { x, y } = getPositionElement(element, direction);
  const oppositeDirection = getOppositeDirection(direction);

  return {
    x,
    y,
    content: '<p>New Element</p>',
    direction: {
      top: { text: 'Top', linked: oppositeDirection === 'top' },
      right: { text: 'Right', linked: oppositeDirection === 'right' },
      bottom: { text: 'Bottom', linked: oppositeDirection === 'bottom' },
      left: { text: 'Left', linked: oppositeDirection === 'left' },
    },
  };
};

export { getPositionElement, newElement, getOppositeDirection };

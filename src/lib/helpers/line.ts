import { Position } from 'types/element';
import { getOppositeDirection } from './element';

export const getPosLink = (element, direction): Position => {
  const distance = 50;
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

export const newLine = (mainId, mainDirection, extraId) => {
  const oppositeDirection = getOppositeDirection(mainDirection);

  return {
    mainId,
    mainDirection,
    extraId,
    extraDirection: oppositeDirection,
  };
};

import { Position, Element } from 'types/element';
import { Line } from 'types/line';

export const generateLines = (listElements: Element[]) => {
  const cloneListElements = [...listElements];
  console.log(cloneListElements);
  let result: Line[] = [];
  for (let i = 0; i < cloneListElements.length - 1; i++) {
    for (let j = i + 1; j < cloneListElements.length; j++) {
      cloneListElements[i]?.nodes?.forEach(node => {
        cloneListElements[j]?.nodes?.forEach(_node => {
          if (node.linkId === _node.linkId && node.linkId !== 'empty') {
            return result.push({
              from: cloneListElements[i].elementId,
              to: cloneListElements[j].elementId,
              linkId: node.linkId,
            });
          }
        });
      });
    }
  }

  return result;
};

export const getElementAndNodeForLine = (
  listElements: Element[],
  line: Line,
) => {
  const element = listElements.find(element => element.elementId === line.from);
  const _element = listElements.find(element => element.elementId === line.to);
  const node = element?.nodes?.find(node => node.linkId === line.linkId);
  const _node = _element?.nodes?.find(node => node.linkId === line.linkId);

  return { element, node, _element, _node };
};

export const getPosLink = (element: Element, direction): Position => {
  const distance = 50;
  const { x, y } = element.position;
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

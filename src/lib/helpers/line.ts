import { Position, Element } from 'types/element';
import { Line } from 'types/line';

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

export const makeRelation = (
  elementId: string,
  _elementId: string,
  linkId: string,
) => {
  const data = {
    from: elementId,
    to: _elementId,
    linkId,
  };

  const links = JSON.parse(<string>localStorage.getItem('links'));
  links.push(data);
  localStorage.setItem('links', JSON.stringify(links));

  return data;
};

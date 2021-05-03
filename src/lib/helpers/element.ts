const convertNumberToDirection = number => {
  switch (Number(number)) {
    case 1: {
      return 'top';
    }
    case 2: {
      return 'right';
    }
    case 3: {
      return 'bottom';
    }
    case 4: {
      return 'left';
    }
    default: {
      return 'top';
    }
  }
};

export { convertNumberToDirection };

export const draggable = ({ pageX, pageY }, item, setPosition) => {
  let drag = { x: pageX, y: pageY };
  let { x, y } = item.position;

  let dragMove = ({ pageX, pageY }) => {
    x -= drag.x - pageX;
    y -= drag.y - pageY;
    setPosition({ x, y });

    drag = { x: pageX, y: pageY };
  };

  let dragEnd = () => {
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
  };

  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup', dragEnd);
};

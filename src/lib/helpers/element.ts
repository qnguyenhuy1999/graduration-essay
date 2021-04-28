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

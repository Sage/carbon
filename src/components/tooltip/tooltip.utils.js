const oppositeDirections = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top'
};

function hasTheSameDirection(tooltipPosition, pointerAlign) {
  const isPositionVertical = isVertical(tooltipPosition);
  const isAlignHorizontal = isHorizontal(pointerAlign);
  const isAlignVertical = isVertical(pointerAlign);
  const areBothVertical = isPositionVertical && isAlignVertical;
  const areBothHorizontal = !isPositionVertical && isAlignHorizontal;

  return areBothVertical || areBothHorizontal;
}

function isVertical(property) {
  return ['top', 'bottom'].includes(property);
}

function isHorizontal(property) {
  return ['left', 'right'].includes(property);
}

function getOppositeDirection(currentDirection) {
  return oppositeDirections[currentDirection];
}

export {
  hasTheSameDirection,
  isVertical,
  isHorizontal,
  getOppositeDirection
};

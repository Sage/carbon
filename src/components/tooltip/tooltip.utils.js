const oppositeDirections = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top",
};

function hasTheSameOrientation(tooltipPosition, pointerAlign) {
  const isPositionVertical = isVertical(tooltipPosition);
  const isAlignHorizontal = isHorizontal(pointerAlign);
  const isAlignVertical = isVertical(pointerAlign);
  const areBothVertical = isPositionVertical && isAlignVertical;
  // position nas no "center" value, so there is no need to check for horizontal
  const areBothHorizontal = !isPositionVertical && isAlignHorizontal;

  return areBothVertical || areBothHorizontal;
}

function isVertical(property) {
  return ["top", "bottom"].includes(property);
}

function isHorizontal(property) {
  return ["left", "right"].includes(property);
}

function getOppositeDirection(currentDirection) {
  return oppositeDirections[currentDirection];
}

export {
  hasTheSameOrientation,
  isVertical,
  isHorizontal,
  getOppositeDirection,
};

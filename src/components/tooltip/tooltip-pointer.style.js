import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";
import OptionsHelper from "../../utils/helpers/options-helper/options-helper";
import sizes from "../../__experimental__/components/input/input-sizes.style";
import {
  hasTheSameOrientation,
  isVertical,
  isHorizontal,
  getOppositeDirection,
} from "./tooltip.utils";

const pointerSize = 7;
const pointerSideMargin = 8;
const pointerDistances = {
  right: `left: -${pointerSize + 0.5}px;`,
  left: "right: 0;",
  bottom: `top: -${pointerSize + 0.5}px;`,
  top: "bottom: 0;",
};
const pointerCenterAlignments = {
  horizontalCenter: `left: calc(50% - ${pointerSize}px);`,
  verticalCenter: `top: calc(50% - ${pointerSize}px);`,
};

const StyledTooltipPointer = styled.span`
  ${({
    align: pointerAlign,
    position,
    theme,
    type,
    size,
    isPartOfInput,
  }) => css`
    position: absolute;

    &:before {
      position: absolute;
      content: "";
      width: 0;
      height: 0;
    }

    ${!hasTheSameOrientation(position, pointerAlign) &&
    css`
      ${getPointerPosition(position, pointerAlign, isPartOfInput, size)}

      &:before {
        ${getPointerBorderStyles(position, theme)}

        ${type === "error" &&
        css`
          border-${position}-color: ${theme.colors.error};
        `}
      }
    `}

    ${pointerDistances[position]}
  `}
`;

function getPointerPosition(
  tooltipPosition,
  pointerAlign,
  isPartOfInput,
  size
) {
  if (isVertical(tooltipPosition) && pointerAlign === "center") {
    return pointerCenterAlignments.horizontalCenter;
  }

  if (isHorizontal(tooltipPosition) && pointerAlign === "center") {
    return pointerCenterAlignments.verticalCenter;
  }

  return getPointerAlignments(isPartOfInput, size)[pointerAlign];
}

function getPointerAlignments(isPartOfInput, size) {
  const horizontalSizeOffset =
    isPartOfInput && size ? sizes[size].tooltipHorizontalOffset : 0;
  const verticalSizeOffset =
    isPartOfInput && size ? sizes[size].tooltipVerticalOffset : 0;
  const horizontalSideMargin = pointerSideMargin + horizontalSizeOffset;
  const verticalSideMargin = pointerSideMargin + verticalSizeOffset;

  return {
    left: `left: ${horizontalSideMargin}px;`,
    right: `right: ${2 * pointerSize + horizontalSideMargin}px;`,
    top: `top: ${verticalSideMargin}px`,
    bottom: `bottom: ${2 * pointerSize + verticalSideMargin}px;`,
  };
}

function getPointerBorderStyles(position, theme) {
  const oppositeDirection = getOppositeDirection(position);
  const defaultStyle = `${pointerSize}px solid transparent`;
  const oppositeDirectionStyle = "none";
  const currentDirectionStyle = `${pointerSize + 1}px solid ${
    theme.colors.black
  }`;
  const borderStyles = {
    top: defaultStyle,
    right: defaultStyle,
    bottom: defaultStyle,
    left: defaultStyle,
  };

  borderStyles[position] = currentDirectionStyle;
  borderStyles[oppositeDirection] = oppositeDirectionStyle;

  return css`
    border-top: ${borderStyles.top};
    border-right: ${borderStyles.right};
    border-bottom: ${borderStyles.bottom};
    border-left: ${borderStyles.left};
  `;
}

StyledTooltipPointer.defaultProps = {
  theme: baseTheme,
};

StyledTooltipPointer.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignAroundEdges),
  position: PropTypes.oneOf(OptionsHelper.positions),
  theme: PropTypes.object,
  type: PropTypes.string,
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
};

export { pointerSize, pointerSideMargin };
export default StyledTooltipPointer;

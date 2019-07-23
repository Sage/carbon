import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import baseTheme from '../../style/themes/base';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import {
  hasTheSameLine,
  isVertical,
  isHorizontal,
  getOppositeDirection
} from './tooltip.utils';

const pointerSize = 7;
const pointerSideMargin = 8;
const pointerDistances = {
  right: `left: -${pointerSize + 0.5}px;`,
  left: 'right: 0;',
  bottom: `top: -${pointerSize + 0.5}px;`,
  top: 'bottom: 0;'
};
const pointerAlignments = {
  horizontalCenter: `left: calc(50% - ${pointerSize}px);`,
  verticalCenter: `top: calc(50% - ${pointerSize}px);`,
  left: `left: ${pointerSideMargin}px;`,
  right: `right: ${2 * pointerSize + pointerSideMargin}px;`,
  top: `top: ${pointerSideMargin}px`,
  bottom: `bottom: ${2 * pointerSize + pointerSideMargin}px;`
};

const StyledTooltipPointer = styled.span`
  ${({
    align: pointerAlign, position, theme, type
  }) => css`
    position: absolute;

    &:before {
      position: absolute;
      content: "";
      width: 0;
      height: 0;
    }

    ${!hasTheSameLine(position, pointerAlign) && css`
      ${getPointerPosition(position, pointerAlign)}

      &:before {
        ${getPointerBorderStyles(position, theme)}

        ${type === 'error' && css`
          border-${position}-color: ${theme.colors.error};
        `}
      }
    `}

    ${pointerDistances[position]}
  `}
`;

function getPointerPosition(tooltipPosition, pointerAlign) {
  if (isVertical(tooltipPosition) && pointerAlign === 'center') {
    return pointerAlignments.horizontalCenter;
  }

  if (isHorizontal(tooltipPosition) && pointerAlign === 'center') {
    return pointerAlignments.verticalCenter;
  }

  return pointerAlignments[pointerAlign];
}

function getPointerBorderStyles(position, theme) {
  const oppositeDirection = getOppositeDirection(position);
  const defaultStyle = `${pointerSize}px solid transparent`;
  const oppositeDirectionStyle = 'none';
  const currentDirectionStyle = `${pointerSize + 1}px solid ${theme.colors.black}`;
  const borderStyles = {
    top: defaultStyle,
    right: defaultStyle,
    bottom: defaultStyle,
    left: defaultStyle
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
  theme: baseTheme
};

StyledTooltipPointer.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignAroundEdges),
  position: PropTypes.oneOf(OptionsHelper.positions),
  theme: PropTypes.object,
  type: PropTypes.string
};

export { pointerSize, pointerSideMargin };
export default StyledTooltipPointer;

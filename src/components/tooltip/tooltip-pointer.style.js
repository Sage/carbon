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

const pointerOffsets = {
  right: 'left: -7.5px;',
  left: 'right: 0;',
  bottom: 'top: -7.5px;',
  top: 'bottom: 0;'
};
const pointerPositions = {
  horizontalCenter: 'left: calc(50% - 7px);',
  verticalCenter: 'top: calc(50% - 7px);',
  left: 'left: 8px;',
  right: 'right: 25px;',
  top: 'top: 10px;',
  bottom: 'bottom: 25px;'
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

    ${pointerOffsets[position]}
  `}
`;

function getPointerPosition(tooltipPosition, pointerAlign) {
  if (isVertical(tooltipPosition) && pointerAlign === 'center') {
    return pointerPositions.horizontalCenter;
  }

  if (isHorizontal(tooltipPosition) && pointerAlign === 'center') {
    return pointerPositions.verticalCenter;
  }

  return pointerPositions[pointerAlign];
}

function getPointerBorderStyles(position, theme) {
  const oppositeDirection = getOppositeDirection(position);
  const defaultStyle = '7px solid transparent';
  const oppositeDirectionStyle = 'none';
  const currentDirectionStyle = `8px solid ${theme.colors.black}`;
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

export default StyledTooltipPointer;

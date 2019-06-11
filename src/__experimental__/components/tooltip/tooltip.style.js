import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';

const StyledTooltipInner = styled.div`
  ${({ theme, type }) => css`
    background-color: ${theme.tooltip.background};
    color: ${theme.colors.white};
    display: inline-block;
    font-weight: 700;
    padding: 10px 15px;
    text-align: center;
    max-width: 300px;
    word-break: normal;
    white-space: pre-wrap;

    ${type === 'error' && css`
      background-color: ${theme.colors.error};
    `}
  `}
`;

StyledTooltipInner.defaultProps = {
  theme: baseTheme
};

StyledTooltipInner.propTypes = {
  theme: PropTypes.object,
  type: PropTypes.string
};

const StyledTooltipWrapper = styled.div`
  ${({ align, position }) => css`
    position: absolute;
    width: 300px;
    z-index: 1003;

    ${(position === 'bottom' || position === 'top') && `
      text-align: center;
    `}

    ${(position === 'left' || position === 'right') && `
      text-align: ${position};
    `}

    ${(align === 'left' || align === 'right') && `
      text-align: ${align};
    `}
  `}
`;

StyledTooltipWrapper.propTypes = {
  align: PropTypes.string,
  position: PropTypes.string
};

const StyledTooltipPointer = styled.span`
  ${({
    align, position, theme, type
  }) => css`
    position: absolute;

    &:before { position: absolute; }

    ${position === 'bottom' && isHorizontallyAligned(align) && css`
      top: -7.5px;

      &:before {
        ${arrow('up', 7, theme.tooltip.background)}
        border-top: none;

        ${type === 'error' && css`
          border-bottom-color: ${theme.colors.error};
        `}
      }
    `}

    ${position === 'left' && isVerticallyAligned(align) && css`
      right: 0px;

      &:before {
        ${arrow('right', 7, theme.tooltip.background)}
        border-right: none;

        ${type === 'error' && css`
          border-left-color: ${theme.colors.error};
        `}
      }
    `}

    ${position === 'right' && isVerticallyAligned(align) && css`
      left: -7.5px;

      &:before {
        ${arrow('left', 7, theme.tooltip.background)}
        border-left: none;

        ${type === 'error' && css`
          border-right-color: ${theme.colors.error};
        `}
      }
    `}

    ${position === 'top' && isHorizontallyAligned(align) && css`
      bottom: 0px;

      &:before {
        ${arrow('down', 7, theme.tooltip.background)}
        border-bottom: none;

        ${type === 'error' && css`
          border-top-color: ${theme.colors.error};
        `}
      }
    `}

    ${align === 'center' && css`
      ${(position === 'bottom' || position === 'top') && css`left: calc(50% - 7px);`}
      ${(position === 'left' || position === 'right') && css`top: calc(50% - 7px);`}
    `}

    ${align === 'left' && (position === 'bottom' || position === 'top') && css`
      left: 10px;
    `}

    ${align === 'right' && (position === 'bottom' || position === 'top') && css`
      right: 25px;
    `}

    ${align === 'top' && (position === 'left' || position === 'right') && css`
      top: 10px;
    `}

    ${align === 'bottom' && (position === 'left' || position === 'right') && css`
      bottom: 25px;
    `}
  `}
`;

StyledTooltipPointer.defaultProps = {
  theme: baseTheme
};

StyledTooltipPointer.propTypes = {
  align: PropTypes.string,
  position: PropTypes.string,
  theme: PropTypes.object,
  type: PropTypes.string
};

function arrow(arrowDirection, size, color) {
  const pairs = [
    { direction: 'down', position: 'top' },
    { direction: 'left', position: 'right' },
    { direction: 'up', position: 'bottom' },
    { direction: 'right', position: 'left' }
  ];

  let styling = 'content: ""; width: 0; height: 0; ';

  pairs.forEach((pair) => {
    if (pair.direction === arrowDirection) {
      styling += `border-${pair.position}: ${size + 1}px solid ${color}; `;
    } else {
      styling += `border-${pair.position}: ${size}px solid transparent; `;
    }
  });

  return css`${styling}`;
}

function isVerticallyAligned(align) {
  return ['top', 'bottom', 'center'].indexOf(align) !== -1;
}

function isHorizontallyAligned(align) {
  return ['left', 'right', 'center'].indexOf(align) !== -1;
}

export { StyledTooltipInner, StyledTooltipWrapper, StyledTooltipPointer };

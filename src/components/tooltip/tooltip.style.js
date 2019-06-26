import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import { THEMES } from '../../style/themes';

const StyledTooltipInner = styled.div`
  ${({ theme, type }) => css`
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    display: inline-block;
    font-weight: 700;
    padding: 12px 16px;
    text-align: center;
    max-width: 300px;
    word-break: normal;
    white-space: pre-wrap;

    ${type === 'error' && css`
      background-color: ${theme.colors.error};
    `}

    ${theme.name === THEMES.classic && css`
      padding: 10px 15px;
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

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const StyledTooltipWrapper = styled.div`
  ${({ align, position }) => css`
    max-width: 300px;
    position: relative;
    animation: ${fadeIn} 0.2s linear;
    z-index: 1003;

    ${['top', 'bottom'].includes(position) && `
      text-align: center;
    `}

    ${['left', 'right'].includes(position) && `
      text-align: ${position};
    `}

    ${['left', 'right'].includes(align) && `
      text-align: ${align};
    `}
  `}
`;

StyledTooltipWrapper.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignAroundEdges),
  position: PropTypes.oneOf(OptionsHelper.positions)
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
        ${arrow('up', 7, theme.colors.black)}
        border-top: none;

        ${type === 'error' && css`
          border-bottom-color: ${theme.colors.error};
        `}
      }
    `}

    ${position === 'left' && isVerticallyAligned(align) && css`
      right: 0px;

      &:before {
        ${arrow('right', 7, theme.colors.black)}
        border-right: none;

        ${type === 'error' && css`
          border-left-color: ${theme.colors.error};
        `}
      }
    `}

    ${position === 'right' && isVerticallyAligned(align) && css`
      left: -7.5px;

      &:before {
        ${arrow('left', 7, theme.colors.black)}
        border-left: none;

        ${type === 'error' && css`
          border-right-color: ${theme.colors.error};
        `}
      }
    `}

    ${position === 'top' && isHorizontallyAligned(align) && css`
      bottom: 0px;

      &:before {
        ${arrow('down', 7, theme.colors.black)}
        border-bottom: none;

        ${type === 'error' && css`
          border-top-color: ${theme.colors.error};
        `}
      }
    `}

    ${align === 'center' && css`
      ${['top', 'bottom'].includes(position) && css`left: calc(50% - 7px);`}
      ${['left', 'right'].includes(position) && css`top: calc(50% - 7px);`}
    `}

    ${align === 'left' && ['top', 'bottom'].includes(position) && css`
      left: 10px;
    `}

    ${align === 'right' && ['top', 'bottom'].includes(position) && css`
      right: 25px;
    `}

    ${align === 'top' && ['left', 'right'].includes(position) && css`
      top: 10px;
    `}

    ${align === 'bottom' && ['left', 'right'].includes(position) && css`
      bottom: 25px;
    `}
  `}
`;

StyledTooltipPointer.defaultProps = {
  theme: baseTheme
};

StyledTooltipPointer.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignAroundEdges),
  position: PropTypes.oneOf(OptionsHelper.positions),
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
  return ['top', 'bottom', 'center'].includes(align);
}

function isHorizontallyAligned(align) {
  return ['left', 'right', 'center'].includes(align);
}

export { StyledTooltipInner, StyledTooltipWrapper, StyledTooltipPointer };

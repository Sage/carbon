import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import { isHorizontal } from './tooltip.utils';
import { isClassic } from '../../utils/helpers/style-helper';

const StyledTooltipInner = styled.div`
  ${({ theme, type }) => css`
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    display: inline-block;
    padding: 12px 16px;
    text-align: center;
    max-width: 300px;
    word-break: break-all;
    white-space: pre-wrap;

    ${type === 'error' && css`
      background-color: ${theme.colors.error};
    `}

    ${isClassic(theme) && css`
      font-weight: 700;
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
  bottom: auto;
  right: auto;
  max-width: 300px;
  position: relative;
  animation: ${fadeIn} 0.2s linear;
  z-index: 1003;
  text-align: ${({ align, position }) => getTextAlignment(position, align)};
`;

StyledTooltipWrapper.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignAroundEdges),
  position: PropTypes.oneOf(OptionsHelper.positions)
};

function getTextAlignment(position, align) {
  let textAlignment = 'center';

  if (isHorizontal(position)) {
    textAlignment = position;
  }

  if (isHorizontal(align)) {
    textAlignment = align;
  }

  return textAlignment;
}

export { StyledTooltipInner, StyledTooltipWrapper };

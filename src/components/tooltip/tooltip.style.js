import styled, { css, keyframes } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../style/themes/base";
import OptionsHelper from "../../utils/helpers/options-helper/options-helper";
import { isHorizontal } from "./tooltip.utils";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const StyledTooltipInner = styled.div`
  ${({ theme, type }) => css`
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    display: inline-block;
    padding: 12px 16px;
    text-align: center;
    max-width: 300px;
    word-break: normal;
    white-space: pre-wrap;
    font-weight: 700;

    ${type === "error" &&
    css`
      background-color: ${theme.colors.error};
    `}
  `}
`;

const StyledTooltipWrapper = styled.div`
  bottom: auto;
  right: auto;
  max-width: 300px;
  position: relative;
  animation: ${fadeIn} 0.2s linear;
  z-index: ${({ theme }) => theme.zIndex.popover};
  text-align: ${({ align, position }) => getTextAlignment(position, align)};
`;

StyledTooltipInner.propTypes = {
  theme: PropTypes.object,
  type: PropTypes.string,
};

StyledTooltipWrapper.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignAroundEdges),
  position: PropTypes.oneOf(OptionsHelper.positions),
};

StyledTooltipWrapper.defaultProps = {
  theme: baseTheme,
};

StyledTooltipInner.defaultProps = {
  theme: baseTheme,
};

function getTextAlignment(position, align) {
  let textAlignment = "center";

  if (isHorizontal(position)) {
    textAlignment = position;
  }

  if (isHorizontal(align)) {
    textAlignment = align;
  }

  return textAlignment;
}

export { StyledTooltipInner, StyledTooltipWrapper };

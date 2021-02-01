import styled, { css, keyframes } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../style/themes/base";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const tooltipColor = (type, theme) =>
  type === "error" ? theme.colors.error : theme.colors.black;

const tooltipOffset = (position, inputSize, isPartOfInput) => {
  if (!isPartOfInput) {
    return { [position]: "1px" };
  }

  switch (inputSize) {
    case "small":
      return `
        ${position}: 5px;
        @-moz-document url-prefix() { 
          ${position}: 7px;
        }
      `;
    case "large":
      return `
        ${position}: -3px;
        @-moz-document url-prefix() { 
          ${position}: -1px;
        }
      `;
    default:
      return `
        ${position}: 1px;
        @-moz-document url-prefix() { 
          ${position}: 4px;
        }
      `;
  }
};

const StyledTooltipWrapper = styled.div`
  ${({ position, size, theme, type, isPartOfInput, inputSize }) => css`
    bottom: auto;
    right: auto;
    max-width: 300px;
    position: relative;
    animation: ${fadeIn} 0.2s linear;
    z-index: ${theme.zIndex.popover};
    text-align: left;
    color: ${theme.colors.white};
    display: inline-block;
    padding: 8px 12px;
    word-break: normal;
    white-space: pre-wrap;
    font-size: ${size === "medium" ? "14px" : "16px"};
    line-height: 1.5rem;
    font-weight: 400;
    background-color: ${tooltipColor(type, theme)};
    ${tooltipOffset(position, inputSize, isPartOfInput)};
  `}
`;

StyledTooltipWrapper.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(["medium", "large"]),
};

StyledTooltipWrapper.defaultProps = {
  theme: baseTheme,
  size: "M",
  inputSize: "medium",
  position: "top",
};

export default StyledTooltipWrapper;

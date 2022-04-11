import styled, { css, keyframes } from "styled-components";
import { Placement } from "tippy.js";

import baseTheme, { ThemeObject } from "../../style/themes/base";
import { toColor } from "../../style/utils/color";
import { TooltipProps, InputSizes } from "./tooltip.component";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const tooltipColor = (theme: ThemeObject, bgColor?: string, type?: string) => {
  if (bgColor) return toColor(theme, bgColor);
  return type === "error"
    ? "var(--colorsSemanticNegative500)"
    : "var(--colorsSemanticNeutral500)";
};

const tooltipOffset = (
  position: Placement,
  inputSize?: InputSizes,
  isPartOfInput?: boolean
) => {
  if (!isPartOfInput) {
    return { [position]: "1px" };
  }

  switch (inputSize) {
    case "small":
      return `
        ${position}: 5px;
        @-moz-document url-prefix() { 
          ${position}: ${["top", "bottom"].includes(position) ? "7px" : "6px"};
        }
      `;
    case "large":
      return `
        ${position}: ${["top", "bottom"].includes(position) ? "0px" : "-2px"};
        @-moz-document url-prefix() { 
          ${position}: -1px;
        }
      `;
    default:
      return `
        ${position}: ${["top", "bottom"].includes(position) ? "4px" : "2px"};
        @-moz-document url-prefix() { 
          ${position}: 4px;
        }
      `;
  }
};

interface StyledTooltipProps
  extends Omit<TooltipProps, "children" | "message" | "position"> {
  position: Placement;
}

const StyledTooltip = styled.div<StyledTooltipProps>`
  ${({
    position,
    size,
    theme,
    type,
    isPartOfInput,
    inputSize = "medium",
    bgColor,
    fontColor,
  }) => css`
    bottom: auto;
    right: auto;
    max-width: 300px;
    position: relative;
    animation: ${fadeIn} 0.2s linear;
    z-index: ${theme.zIndex
      .popover}; // TODO (tokens): implement elevation tokens - FE-4437
    text-align: left;
    color: ${fontColor
      ? toColor(theme, fontColor)
      : "var(--colorsSemanticNeutralYang100)"};
    display: inline-block;
    padding: 8px 12px;
    word-break: break-word;
    white-space: pre-wrap;
    font-size: ${size === "medium" ? "14px" : "16px"};
    line-height: 1.5rem;
    font-weight: 400;
    background-color: ${tooltipColor(theme, bgColor, type)};
    ${tooltipOffset(position, inputSize, isPartOfInput)};
  `}
`;

StyledTooltip.defaultProps = {
  theme: baseTheme,
};

export default StyledTooltip;

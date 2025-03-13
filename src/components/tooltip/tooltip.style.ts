import styled, { DefaultTheme, css, keyframes } from "styled-components";

import baseTheme, { ThemeObject } from "../../style/themes/base";
import { toColor } from "../../style/utils/color";
import { TooltipProps } from "./tooltip.component";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const tooltipColor = (
  theme: ThemeObject | DefaultTheme,
  bgColor?: string,
  type?: string,
) => {
  if (bgColor) return toColor(theme, bgColor);
  return type === "error"
    ? "var(--colorsSemanticNegative500)"
    : "var(--colorsSemanticNeutral500)";
};

const StyledTooltip = styled.div<
  Pick<TooltipProps, "size" | "type" | "bgColor" | "fontColor">
>`
  ${({ size, theme, type, bgColor, fontColor }) => css`
    bottom: auto;
    right: auto;
    max-width: 300px;
    width: max-content;
    border-radius: var(--borderRadius050);
    position: absolute;
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
  `}
`;

StyledTooltip.defaultProps = {
  theme: baseTheme,
};

export default StyledTooltip;

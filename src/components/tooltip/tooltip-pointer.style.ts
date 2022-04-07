import styled, { css } from "styled-components";
import { Placement } from "tippy.js";

import baseTheme, { ThemeObject } from "../../style/themes/base";
import { toColor } from "../../style/utils/color";

interface StyledTooltipPointer {
  /** Sets position of the tooltip */
  position?: Placement;
  /** Defines the message type */
  type?: string;
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  bgColor?: string;
}

const pointerColor = (theme: ThemeObject, bgColor?: string, type?: string) => {
  if (bgColor) return toColor(theme, bgColor);
  return type === "error"
    ? "var(--colorsSemanticNegative500)"
    : "var(--colorsSemanticNeutral500)";
};
const StyledTooltipPointer = styled.div<StyledTooltipPointer>`
  ${({ position, theme, type, bgColor }) => css`
    position: absolute;
    width: 0;
    height: 0;

    ${position === "top" &&
    css`
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid ${pointerColor(theme, bgColor, type)};
      bottom: calc(-1 * var(--spacing100));
      @-moz-document url-prefix() {
        bottom: -7px;
      }
    `}

    ${position === "bottom" &&
    css`
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid ${pointerColor(theme, bgColor, type)};
      top: calc(-1 * var(--spacing100));
      @-moz-document url-prefix() {
        top: -7px;
      }
    `}

    ${position === "right" &&
    css`
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 8px solid ${pointerColor(theme, bgColor, type)};
      left: calc(-1 * var(--spacing100));
      @-moz-document url-prefix() {
        left: -7px;
      }
    `}

    ${position === "left" &&
    css`
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid ${pointerColor(theme, bgColor, type)};
      right: calc(-1 * var(--spacing100));
      @-moz-document url-prefix() {
        right: -7px;
      }
    `}
  `}
`;

StyledTooltipPointer.defaultProps = {
  theme: baseTheme,
  position: "top",
};

export default StyledTooltipPointer;

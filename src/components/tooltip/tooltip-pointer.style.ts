import styled, { css } from "styled-components";

import baseTheme from "../../style/themes/base";
import type { ThemeObject } from "../../style/themes/theme.types";
import { toColor } from "../../style/utils/color";
import { TooltipProps } from "./tooltip.component";

const pointerColor = (theme: ThemeObject, bgColor?: string, type?: string) => {
  if (bgColor) return toColor(theme, bgColor);
  return type === "error"
    ? "var(--colorsSemanticNegative500)"
    : "var(--colorsSemanticNeutral500)";
};

const StyledTooltipPointer = styled.div<Pick<TooltipProps, "type" | "bgColor">>`
  ${({ theme, type, bgColor }) => css`
    z-index: ${theme.zIndex
      .popover}; // TODO (tokens): implement elevation tokens - FE-4437
    background: ${pointerColor(theme, bgColor, type)};
    position: absolute;
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
  `}
`;

StyledTooltipPointer.defaultProps = {
  theme: baseTheme,
};

export default StyledTooltipPointer;

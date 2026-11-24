import styled, { css } from "styled-components";

import type {
  ColorPickerColor,
  ColorPickerPalette,
} from "./color-picker.config";

type SwatchSize = "small" | "medium" | "large";

const swatchSize: Record<SwatchSize, string> = {
  small: "var(--global-size-xs)",
  medium: "var(--global-size-xs)",
  large: "calc(var(--global-size-xs) + var(--global-size-5-xs))",
};

const StyledSwatch = styled.span<{
  $color: ColorPickerColor;
  $palette: ColorPickerPalette;
  $size: SwatchSize;
}>`
  ${({ $color, $palette, $size }) => css`
    display: inline-block;
    flex-shrink: 0;
    box-sizing: border-box;
    width: ${swatchSize[$size]};
    height: ${swatchSize[$size]};
    border-radius: var(--global-radius-container-circle);
    border: var(--global-borderwidth-xs) solid
      var(--mode-color-generic-depth-delicate);
    background-color: var(
      --mode-color-status-custom-${$color}-${$palette === "rich"
          ? "default"
          : "hover-alt"}
    );
  `}
`;

export default StyledSwatch;

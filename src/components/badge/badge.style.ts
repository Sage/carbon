import styled, { css } from "styled-components";
import { margin } from "styled-system";
import StyledIcon from "../icon/icon.style";
import Button from "../button";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { toColor } from "../../style/utils/color";

// size of badge + 2px border
const getSize = (size?: string) => {
  switch (size) {
    case "small":
      return css`
        width: 12px;
        height: 12px;
      `;
    case "large":
      return css`
        min-width: 28px;
        height: 28px;
        padding: 0px 4px 1px;
      `;
    // medium
    default:
      return css`
        min-width: 24px;
        height: 24px;
        padding: 0px 2px 1px;
      `;
  }
};

// TODO: replace with design tokens
const getVariantColor = (variant?: string, inverse?: boolean) => {
  switch (variant) {
    case "subtle":
      return `
        ${inverse ? "#007ED9" : "#0060A7"};
      `;
    // typical
    default:
      return `
        ${inverse ? "#E13E53" : "#CD384B"};
      `;
  }
};

const getPosition = (size?: string) => {
  switch (size) {
    case "small":
      return css`
        top: -3px;
        right: -2px;
      `;
    case "large":
      return css`
        top: -14px;
        right: -8px;
      `;
    // medium
    default:
      return css`
        top: -12px;
        right: -8px;
      `;
  }
};

const StyledBadgeWrapper = styled.div`
  ${margin}
  position: relative;
  display: inline-block;
`;

const StyledCounter = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 150%;
`;

interface StyledBadgeProps {
  customColor?: string;
  size?: "small" | "medium" | "large";
  variant?: "typical" | "subtle";
  inverse?: boolean;
  hasChildren?: boolean;
}

const StyledBadge = styled.span.attrs(applyBaseTheme).attrs(({ onClick }) => ({
  as: onClick ? Button : undefined,
}))<StyledBadgeProps>`
  ${margin}
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 999px;
  border: solid 2px;

  ${({
    size,
    variant,
    inverse,
    hasChildren,
    customColor,
    theme,
    onClick,
  }) => css`
    ${getSize(size)};
    background-color: ${getVariantColor(variant, inverse)};

    border-color: ${inverse
      ? "var(--colorsUtilityYin100)"
      : "var(--colorsUtilityYang100)"};
    color: ${inverse
      ? "var(--colorsUtilityYin100)"
      : "var(--colorsUtilityYang100)"};

    ${hasChildren &&
    css`
      position: absolute;
      z-index: 2;
      ${getPosition(size)};
    `}

    ${onClick &&
    css`
      min-height: 0;
      :hover,
      :focus {
        padding: 0;
        border-color: ${getVariantColor(variant, inverse)};
        background-color: ${getVariantColor(variant, inverse)};

        ${StyledIcon} {
          margin: 0;
          color: ${inverse
            ? "var(--colorsUtilityYin100)"
            : "var(--colorsUtilityYang100)"};
        }
      }
    `}

    ${customColor &&
    css`
      background-color: var(--colorsUtilityYang100);
      border-color: ${toColor(theme, customColor)};
      color: ${toColor(theme, customColor)};

      ${onClick &&
      // tested in playwright, RTL cannot test pseudo-classes
      /* istanbul ignore next */
      css`
        :hover,
        :focus {
          background-color: ${toColor(theme, customColor)};
          border-color: ${toColor(theme, customColor)};
        }
      `}
    `}
  `}
`;

export { StyledBadge, StyledBadgeWrapper, StyledCounter };

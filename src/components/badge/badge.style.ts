import styled, { css } from "styled-components";
import { margin } from "styled-system";
import StyledIcon from "../icon/icon.style";
import Button from "../button";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { toColor } from "../../style/utils/color";

const getSize = (size?: string) => {
  switch (size) {
    case "small":
      return css`
        width: var(--global-size-4-xs, 8px);
        height: var(--global-size-4-xs, 8px);
      `;
    case "large":
      return css`
        min-width: var(--global-size-2-xs, 20px);
        height: var(--global-size-xs, 24px);
        padding: 0 var(--global-space-comp-2-xs, 2px);
      `;
    // medium
    default:
      return css`
        min-width: var(--global-size-3-xs, 16px);
        height: var(--global-size-2-xs, 20px);
        padding: 0 var(--global-space-comp-2-xs, 2px);
      `;
  }
};

const getVariantColor = (variant?: string, inverse?: boolean) => {
  switch (variant) {
    case "subtle":
      return `
        ${inverse ? "var(--badge-inverse-bg-alt, #007FD9)" : "var(--badge-bg-alt, #0071C3)"};
      `;
    // typical
    default:
      return `
        ${inverse ? "var(--badge-inverse-bg-default, #F50059)" : "var(--badge-bg-default, #DB004E)"};
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
        top: -12px;
        right: -8px;
      `;
    // medium
    default:
      return css`
        top: -10px;
        right: -6px;
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
  box-sizing: content-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: var(--global-radius-container-circle, 999px);
  border: solid var(--global-borderwidth-s, 2px);

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
      ? "var(--badge-inverse-border-default, #000)"
      : "var(--badge-border-default, #FFF)"};
    color: ${inverse
      ? "var(--badge-inverse-label-default, #000)"
      : "var(--badge-label-default, #FFF)"};

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
            ? "var(--badge-inverse-label-default, #000)"
            : "var(--badge-label-default, #FFF)"};
        }
      }
    `}

    ${customColor &&
    css`
      background-color: var(--badge-border-default, #fff);
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

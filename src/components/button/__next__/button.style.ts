import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import addFocusStyling from "../../../style/utils/add-focus-styling";
import {
  colourSettings,
  gradientAnimation,
  inverseColourSettings,
  propsForSize,
  Size,
  Variant,
  VariantType,
} from "./button.config";

const getCSSForGradientStyle = ({
  allowMotion = true,
  disabled,
  size,
  iconOnly,
}: {
  allowMotion?: boolean;
  disabled?: boolean;
  size: Size;
  iconOnly?: boolean;
}) => {
  const { background, border, label } =
    colourSettings.gradient.secondary || /* istanbul ignore next */ {};
  const { borderRadius, font, height, paddingVertical, paddingHorizontal } =
    propsForSize[size];

  return css`
    position: relative;
    z-index: 0;
    border: none;
    border-radius: ${iconOnly
      ? "var(--global-radius-action-circle)"
      : borderRadius};
    background: white;
    color: var(--button-ai-label-default);
    font: ${font};
    height: ${height};
    width: ${iconOnly ? height : "max-content"};
    padding: ${paddingVertical} ${iconOnly ? "" : paddingHorizontal};
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      padding: 2px;
      border-radius: inherit;
      z-index: -1;

      background: var(--button-ai-border-default);
      background-position: 0% 0;

      -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }

    &:hover {
      background: linear-gradient(
        90deg,
        var(--mode-color-action-ai-hover-stop-1) 0%,
        var(--mode-color-action-ai-hover-stop-2) 40%,
        var(--mode-color-action-ai-hover-stop-3) 90%
      );
    }

    &:hover::before {
      ${allowMotion &&
      css`
        background-size: 300% 100%;
        animation: gradient-loop 1000ms linear infinite;
      `}
    }

    ${disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
      cursor: not-allowed;

      &::before {
        animation: none;
        background: none;
        -webkit-mask: none;
        mask: none;
        border: 2px solid var(--button-ai-border-disabled);
        padding: 0;
      }

      color: var(--button-ai-label-disabled);
    `}

    ${!disabled &&
    css`
      &:active {
        background: ${background?.active};
        color: ${label?.active};
        border-color: ${border?.active};
      }
    `}
  `;
};

const getCSSForInverseStyle = ({
  disabled,
  size,
  variantType,
  iconOnly,
}: {
  disabled?: boolean;
  size: Size;
  variantType: VariantType;
  iconOnly?: boolean;
}) => {
  const { background, border, label } = inverseColourSettings[variantType];
  const { borderRadius, font, height, paddingVertical, paddingHorizontal } =
    propsForSize[size];

  return css`
    background-color: ${background.default};
    border: ${variantType === "tertiary" ? "1px" : "2px"} solid
      ${border.default};
    border-radius: ${iconOnly
      ? "var(--global-radius-action-circle)"
      : borderRadius};
    color: ${label.default};
    font: ${font};
    height: ${height};
    width: ${iconOnly ? height : "max-content"};
    padding: ${paddingVertical} ${iconOnly ? "" : paddingHorizontal};

    ${disabled
      ? css`
          background-color: ${background.disabled};
          border-color: ${border.disabled};
          color: ${label.disabled};
          cursor: not-allowed;
        `
      : css`
          &:active {
            background-color: ${background.active};
            color: ${label.active};
            border-color: ${border.active};
          }

          &:hover {
            background-color: ${background.hover};
            color: ${label.hover};
            border-color: ${border.hover};
          }
        `}
  `;
};

const getCSSForStyle = ({
  disabled,
  size,
  variant,
  variantType,
  iconOnly,
}: {
  disabled?: boolean;
  size: Size;
  variant: Variant;
  variantType: VariantType;
  iconOnly?: boolean;
}) => {
  const { background, border, label } =
    colourSettings[variant][variantType] || /* istanbul ignore next */ {};
  const { borderRadius, font, height, paddingVertical, paddingHorizontal } =
    propsForSize[size];

  return css`
    background-color: ${background?.default};
    border: ${variantType === "tertiary" ? "1px" : "2px"} solid
      ${border?.default};
    border-radius: ${iconOnly
      ? "var(--global-radius-action-circle)"
      : borderRadius};
    color: ${label?.default};
    font: ${font};
    height: ${height};
    width: ${iconOnly ? height : "max-content"};
    padding: ${paddingVertical} ${iconOnly ? "" : paddingHorizontal};

    ${disabled
      ? css`
          background-color: ${background?.disabled};
          border-color: ${border?.disabled};
          color: ${label?.disabled};
          cursor: not-allowed;
        `
      : css`
          &:active {
            background-color: ${background?.active};
            color: ${label?.active};
            border-color: ${border?.active};
          }

          &:hover {
            background-color: ${background?.hover};
            color: ${label?.hover};
            border-color: ${border?.hover};
          }
        `}
  `;
};

type StyledButtonProps = SpaceProps & {
  $allowMotion?: boolean;
  $inverse?: boolean;
  $fullWidth?: boolean;
  $noWrap?: boolean;
  $iconOnly?: boolean;
};

export const StyledContentContainer = styled.span`
  display: flex;
  gap: var(--global-space-comp-s);
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled.button<
  Omit<StyledButtonProps, "size" | "variant" | "variantType"> & {
    $size: Size;
    $variant: Variant;
    $variantType: VariantType;
  }
>`
  ${space}

  align-items: center;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  outline-offset: 0;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;

  ${({
    $allowMotion,
    disabled,
    $inverse,
    $size,
    $variant,
    $variantType,
    $iconOnly,
  }) => {
    if ($inverse) {
      return getCSSForInverseStyle({
        disabled,
        size: $size,
        variantType: $variantType,
        iconOnly: $iconOnly,
      });
    }

    if ($variant === "gradient") {
      return css`
        ${gradientAnimation}
        ${getCSSForGradientStyle({
          allowMotion: $allowMotion,
          disabled,
          size: $size,
          iconOnly: $iconOnly,
        })}
      `;
    }

    /**
     * XS should fall back to the "default secondary" colour scheme
     * */
    if (
      $size === "xs" &&
      ($variantType === "primary" || $variant !== "default")
    ) {
      return getCSSForStyle({
        disabled,
        size: "xs",
        variant: "default",
        variantType: "secondary",
        iconOnly: $iconOnly,
      });
    }

    /**
     * Unsupported combinations of variant and variantType should fall back to
     * the "primary" variant type for said variant
     * */
    if (
      $variant === "destructive" &&
      ($variantType === "tertiary" || $variantType === "subtle")
    ) {
      return getCSSForStyle({
        disabled,
        size: $size,
        variant: $variant,
        variantType: "primary",
        iconOnly: $iconOnly,
      });
    }

    return getCSSForStyle({
      disabled,
      size: $size,
      variant: $variant,
      variantType: $variantType,
      iconOnly: $iconOnly,
    });
  }}

  ${({ $fullWidth, $size, $noWrap }) => css`
    ${$fullWidth &&
    css`
      width: 100%;
    `}

    ${$noWrap
      ? "white-space: nowrap;"
      : `
        flex-flow: wrap;
        min-height: ${propsForSize[$size].height};
        height: unset;
      `}
  `}

  &:focus {
    ${addFocusStyling()}
    position: relative;
    z-index: 1;
  }
`;

export default StyledButton;

import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import addFocusStyling from "../../../../style/utils/add-focus-styling";
import {
  colourSettings,
  gradientAnimation,
  inverseColourSettings,
  propsForSize,
  Size,
  Variant,
  VariantType,
} from "./button.config";

const getCSSForAIStyle = ({
  allowMotion = true,
  disabled,
  size = "medium",
}: {
  allowMotion?: boolean;
  disabled?: boolean;
  size: Size;
}) => css`
  position: relative;
  z-index: 0;
  border: none;
  border-radius: ${propsForSize[size].borderRadius};
  background: white;
  color: var(--button-ai-label-default);
  font-size: ${propsForSize[size].fontSize};
  font-weight: var(--fontWeights500);
  line-height: var(--lineHeights500);
  height: ${propsForSize[size].height};
  padding: ${propsForSize[size].paddingVertical}
    ${propsForSize[size].paddingHorizontal};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px;
    border-radius: inherit;
    z-index: -1;

    background: linear-gradient(
      90deg,
      var(--mode-color-ai-stop-1) 0%,
      var(--mode-color-ai-stop-2) 40%,
      var(--mode-color-ai-stop-3) 100%
    );
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
      animation: gradient-loop 1000ms linear 1;
    `}
  }

  ${disabled &&
  css`
    opacity: 0.6;
    pointer-events: none;

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
`;

const getCSSForInverseStyle = ({
  disabled,
  size = "medium",
  variantType,
}: {
  disabled?: boolean;
  size: Size;
  variantType: VariantType;
}) => {
  const { background, border, label } = inverseColourSettings[variantType];
  const { borderRadius, fontSize, height, paddingVertical, paddingHorizontal } =
    propsForSize[size];

  return css`
    background-color: ${background.default};
    border: ${variantType === "tertiary" ? "1px" : "2px"} solid
      ${border.default};
    border-radius: ${borderRadius};
    color: ${label.default};
    font-size: ${fontSize};
    font-weight: var(--fontWeights500);
    line-height: var(--lineHeights500);
    min-height: ${height};
    padding: ${paddingVertical} ${paddingHorizontal};

    ${disabled
      ? css`
          background-color: ${background.disabled};
          border: ${variantType === "tertiary" ? "1px" : "2px"} solid
            ${border.disabled};
          color: ${label.disabled};
        `
      : css`
          &:active {
            background-color: ${background.active};
            color: ${label.active};
          }

          &:hover {
            background-color: ${background.hover};
            color: ${label.hover};
          }
        `}
  `;
};

const getCSSForStyle = ({
  disabled,
  size = "medium",
  // we need to default these here for split button toggle to work
  // should be removed when that has been updated
  variant = "default",
  variantType = "secondary",
}: {
  disabled?: boolean;
  size: Size;
  variant: Variant;
  variantType: VariantType;
}) => {
  const colourConfig = colourSettings[variant][variantType];

  if (!colourConfig) {
    throw new Error(
      `No colour settings found for variant type: ${variantType}`,
    );
  }

  const { background, border, label } = colourConfig;
  const { borderRadius, fontSize, height, paddingVertical, paddingHorizontal } =
    propsForSize[size];

  return css`
    background-color: ${background.default};
    border: ${variantType === "tertiary" ? "1px" : "2px"} solid
      ${border.default};
    border-radius: ${borderRadius};
    color: ${label.default};
    font-size: ${fontSize};
    font-weight: var(--fontWeights500);
    line-height: var(--lineHeights500);
    height: ${height};
    padding: ${paddingVertical} ${paddingHorizontal};

    ${disabled
      ? css`
          background-color: ${background.disabled};
          border: ${variantType === "tertiary" ? "1px" : "2px"} solid
            ${border.disabled};
          color: ${label.disabled};
        `
      : css`
          &:active {
            background-color: ${background.active};
            color: ${label.active};
          }

          &:hover {
            background-color: ${background.hover};
            color: ${label.hover};
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
  gap: var(--spacing100);
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

  ${({ disabled }) => !disabled && "cursor: pointer;"}

  ${({
    $allowMotion,
    disabled,
    $inverse,
    $size = "medium",
    $variant,
    $variantType,
  }) => {
    if ($inverse) {
      return getCSSForInverseStyle({
        disabled,
        size: $size,
        variantType: $variantType,
      });
    }

    if ($variant === "gradient") {
      return css`
        ${gradientAnimation}
        ${getCSSForAIStyle({
          allowMotion: $allowMotion,
          disabled,
          size: $size,
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
      });
    }

    /**
     * Unsupported combinations of variant and variantType should fall back to
     * the "primary" variant type for said variant
     * */
    /* istanbul ignore if */
    if (
      $variant === "destructive" &&
      ($variantType === "tertiary" || $variantType === "subtle")
    ) {
      return getCSSForStyle({
        disabled,
        size: $size,
        variant: $variant,
        variantType: "primary",
      });
    }

    return getCSSForStyle({
      disabled,
      size: $size,
      variant: $variant,
      variantType: $variantType,
    });
  }}

  ${({ $fullWidth, $size = "medium", $noWrap }) => css`
    ${$fullWidth ? "width: 100%;" : "width: max-content;"}

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

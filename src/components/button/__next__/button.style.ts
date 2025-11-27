import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import { ButtonProps } from "./button.component";
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

const getCSSForAIStyle = ({
  allowMotion = true,
  disabled,
  size,
}: {
  allowMotion?: boolean;
  disabled?: boolean;
  size: NonNullable<Size>;
}) => css`
  position: relative;
  z-index: 0;
  border: none;
  border-radius: ${propsForSize[size].borderRadius};
  background: white;
  color: var(--button-ai-label-default, #000000e6);
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
      var(--mode-color-ai-stop-1, #13a038) 0%,
      var(--mode-color-ai-stop-2, #149197) 40%,
      var(--mode-color-ai-stop-3, #a87cfb) 100%
    );
    background-position: 0% 0;

    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  &:hover {
    background: linear-gradient(
      90deg,
      var(--mode-color-action-ai-hover-stop-1, rgba(18, 160, 56, 0.08)) 0%,
      var(--mode-color-action-ai-hover-stop-2, rgba(20, 145, 151, 0.08)) 40%,
      var(--mode-color-action-ai-hover-stop-3, rgba(168, 124, 251, 0.08)) 90%
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

    &::before {
      animation: none;
      background: none;
      -webkit-mask: none;
      mask: none;
      border: 2px solid var(--button-ai-border-disabled, rgba(0, 0, 0, 0.3));
      padding: 0;
    }

    color: var(--button-ai-label-disabled, #0000006b);
  `}
`;

const getCSSForInverseStyle = ({
  disabled,
  size,
  variantType,
}: {
  disabled?: boolean;
  size: NonNullable<Size>;
  variantType: NonNullable<VariantType>;
}) => css`
  background-color: ${inverseColourSettings[variantType]?.background.default};
  border: ${variantType === "tertiary" ? "1px" : "2px"} solid
    ${inverseColourSettings[variantType]?.border.default};
  border-radius: ${propsForSize[size].borderRadius};
  color: ${inverseColourSettings[variantType]?.label.default};
  font-size: ${propsForSize[size].fontSize};
  font-weight: var(--fontWeights500);
  line-height: var(--lineHeights500);
  min-height: ${propsForSize[size].height};
  padding: ${propsForSize[size].paddingVertical}
    ${propsForSize[size].paddingHorizontal};

  ${disabled
    ? css`
        background-color: ${inverseColourSettings[variantType]?.background
          .disabled};
        border: ${variantType === "tertiary" ? "1px" : "2px"} solid
          ${inverseColourSettings[variantType]?.border.disabled};
        color: ${inverseColourSettings[variantType]?.label.disabled};
      `
    : css`
        &:active {
          background-color: ${inverseColourSettings[variantType]?.background
            .active};
          color: ${inverseColourSettings[variantType]?.label.active};
        }

        &:hover {
          background-color: ${inverseColourSettings[variantType]?.background
            .hover};
          color: ${inverseColourSettings[variantType]?.label.hover};
        }
      `}
`;

const getCSSForStyle = ({
  disabled,
  size,
  variant,
  variantType,
}: {
  disabled?: boolean;
  size: NonNullable<Size>;
  variant: NonNullable<Variant>;
  variantType: NonNullable<VariantType>;
}) => css`
  background-color: ${colourSettings[variant][variantType]?.background.default};
  border: ${variantType === "tertiary" ? "1px" : "2px"} solid
    ${colourSettings[variant][variantType]?.border.default};
  border-radius: ${propsForSize[size].borderRadius};
  color: ${colourSettings[variant][variantType]?.label.default};
  font-size: ${propsForSize[size].fontSize};
  font-weight: var(--fontWeights500);
  line-height: var(--lineHeights500);
  height: ${propsForSize[size].height};
  padding: ${propsForSize[size].paddingVertical}
    ${propsForSize[size].paddingHorizontal};

  ${disabled
    ? css`
        background-color: ${colourSettings[variant][variantType]?.background
          .disabled};
        border: ${variantType === "tertiary" ? "1px" : "2px"} solid
          ${colourSettings[variant][variantType]?.border.disabled};
        color: ${colourSettings[variant][variantType]?.label.disabled};
      `
    : css`
        &:active {
          background-color: ${colourSettings[variant][variantType]?.background
            .active};
          color: ${colourSettings[variant][variantType]?.label.active};
        }

        &:hover {
          background-color: ${colourSettings[variant][variantType]?.background
            .hover};
          color: ${colourSettings[variant][variantType]?.label.hover};
        }
      `}
`;

type StyledButtonProps = ButtonProps &
  SpaceProps & {
    allowMotion?: boolean;

    iconOnly?: boolean;
  };

export const StyledContentContainer = styled.span`
  display: flex;
  gap: var(--spacing100);
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled.button<
  Omit<StyledButtonProps, "size" | "variant" | "variantType"> & {
    size: NonNullable<Size>;
    variant: NonNullable<Variant>;
    variantType: NonNullable<VariantType>;
  }
>`
  ${space}

  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline-offset: 0;
  text-decoration: none;
  vertical-align: middle;

  ${({ allowMotion, disabled, inverse, size, variant, variantType }) => {
    if (inverse) {
      return getCSSForInverseStyle({
        disabled,
        size: size as NonNullable<Size>,
        variantType: variantType as NonNullable<VariantType>,
      });
    }

    if (variant === "ai") {
      return css`
        ${gradientAnimation}
        ${getCSSForAIStyle({
          allowMotion,
          disabled,
          size,
        })}
      `;
    }

    /**
     * XS should fall back to the "default secondary" colour scheme
     * */
    if (size === "xs" && (variantType === "primary" || variant !== "default")) {
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
      variant === "destructive" &&
      (variantType === "tertiary" || variantType === "subtle")
    ) {
      return getCSSForStyle({
        disabled,
        size,
        variant,
        variantType: "primary",
      });
    }

    return getCSSForStyle({
      disabled,
      size,
      variant,
      variantType,
    });
  }}

  ${({ fullWidth, size, noWrap }) => css`
    ${fullWidth
      ? css`
          width: 100%;
        `
      : `width: max-content;`}

    ${noWrap
      ? css`
          white-space: nowrap;
        `
      : css`
          flex-flow: wrap;
          min-height: ${propsForSize[size].height};
          height: unset;
        `}
  `}

  &:focus {
    ${addFocusStyling()}
  }
`;

export default StyledButton;

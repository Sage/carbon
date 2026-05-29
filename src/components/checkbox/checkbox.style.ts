import styled, { css } from "styled-components";
import { margin } from "styled-system";
import HiddenCheckableInputStyle from "../../__internal__/checkable-input/hidden-checkable-input.style";
import StyledCheckableInputSvgWrapper from "../../__internal__/checkable-input/checkable-input-svg-wrapper.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import addFocusStyling from "../../style/utils/add-focus-styling";

const sizeMap = {
  small: {
    inputSize: "var(--global-size-3-xs)",
    checkSvgSize: "12px",
    indeterminateSvgSize: "10px",
    validationGap: "var(--global-space-comp-xs)",
  },
  medium: {
    inputSize: "var(--global-size-xs)",
    checkSvgSize: "16px",
    indeterminateSvgSize: "16px",
    validationGap: "var(--global-space-comp-s)",
  },
  large: {
    inputSize: "var(--global-size-s)",
    checkSvgSize: "22px",
    indeterminateSvgSize: "20px",
    validationGap: "var(--global-space-comp-s)",
  },
};
interface StyledCheckboxProps {
  $isDisabled?: boolean;
  $size: "small" | "medium" | "large";
  $error?: boolean;
  $checked?: boolean;
  $indeterminate?: boolean;
}

export const StyledCheckbox = styled.div.attrs(
  applyBaseTheme,
)<StyledCheckboxProps>`
  margin-bottom: var(--fieldSpacing);
  ${margin};

  ${({ $isDisabled, $size, $error, $checked, $indeterminate }) => css`
    ${StyledCheckableInputSvgWrapper} {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      background-color: var(--input-typical-bg-default);
      border: var(--global-borderwidth-xs) solid
        var(--input-typical-border-default);
      border-radius: ${$size === "large"
        ? "var(--global-radius-action-m)"
        : "var(--global-radius-action-s)"};

      height: ${sizeMap[$size].inputSize};
      width: ${sizeMap[$size].inputSize};

      ${$checked &&
      css`
        svg {
          width: ${sizeMap[$size].checkSvgSize};
        }
      `}

      ${$indeterminate &&
      css`
        svg {
          width: ${sizeMap[$size].indeterminateSvgSize};
        }
      `}

      ${!$isDisabled &&
      $error &&
      css`
        border: var(--global-borderwidth-s) solid
          var(--input-validation-border-error);
      `}

      ${$isDisabled &&
      css`
        border-color: var(--input-typical-border-disabled);
        background-color: var(--input-typical-bg-disabled);
      `}
    }

    ${HiddenCheckableInputStyle} {
      position: absolute;
      box-sizing: border-box;
      min-height: var(--global-size-xs);

      height: ${sizeMap[$size].inputSize};
      width: ${sizeMap[$size].inputSize};
    }

    ${($checked || $indeterminate) &&
    css`
      svg path,
      svg rect {
        fill: var(--input-typical-icon-active);

        ${$isDisabled &&
        css`
          fill: var(--input-typical-icon-disabled);
        `}
      }
    `}

    ${HiddenCheckableInputStyle}:not([disabled]) {
      &:focus + ${StyledCheckableInputSvgWrapper} {
        ${addFocusStyling()}
      }
    }
  `}
`;

export const StyledCheckboxContentWrapper = styled.div<{
  $size: "small" | "medium" | "large";
}>`
  ${({ $size }) => css`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: ${sizeMap[$size].validationGap};
  `};
`;

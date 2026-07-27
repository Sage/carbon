import styled, { css } from "styled-components";
import { margin } from "styled-system";
import HiddenCheckableInputStyle from "../../__internal__/checkable-input/hidden-checkable-input.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import addFocusStyling from "../../style/utils/add-focus-styling";

const sizeMap = {
  small: {
    svgSize: "var(--global-size-3-xs)",
    labelFont: "var(--global-font-static-comp-regular-s)",
  },
  medium: {
    svgSize: "var(--global-size-xs)",
    labelFont: "var(--global-font-static-comp-regular-m)",
  },
  large: {
    svgSize: "var(--global-size-s)",
    labelFont: "var(--global-font-static-comp-regular-l)",
  },
};

interface RadioButtonStyleProps {
  $isDisabled?: boolean;
  $size: "small" | "medium" | "large";
  $error?: boolean;
}

const RadioButtonStyle = styled.div.attrs(
  applyBaseTheme,
)<RadioButtonStyleProps>`
  ${({ $isDisabled, $size, $error }) => css`
    .checkable-label {
      font: ${sizeMap[$size].labelFont};
    }

    [data-role="checkable-input-svg-wrapper"],
    svg {
      border-radius: var(--global-radius-action-circle);
    }

    ${HiddenCheckableInputStyle} {
      position: absolute;
      box-sizing: border-box;
      min-height: var(--global-size-xs);
    }

    ${HiddenCheckableInputStyle},
    [data-role="checkable-input-svg-wrapper"],
    svg {
      height: ${sizeMap[$size].svgSize};
      width: ${sizeMap[$size].svgSize};
    }

    svg {
      box-sizing: border-box;
      background-color: var(--input-typical-bg-default);
      border: var(--global-borderwidth-xs) solid
        var(--input-typical-border-default);

      ${!$isDisabled &&
      $error &&
      css`
        border: var(--global-borderwidth-s) solid
          var(--input-validation-border-error);
      `}
    }

    ${HiddenCheckableInputStyle}:checked + [data-role="checkable-input-svg-wrapper"] circle {
      fill: var(--input-typical-icon-active);
    }

    ${HiddenCheckableInputStyle}:not([disabled]) {
      &:focus + [data-role="checkable-input-svg-wrapper"] {
        ${addFocusStyling()}
      }
    }

    ${$isDisabled &&
    css`
      svg {
        border-color: var(--input-typical-border-disabled);
        background-color: var(--input-typical-bg-disabled);
      }

      circle {
        fill: var(--input-typical-bg-disabled);
      }

      ${HiddenCheckableInputStyle}:checked + [data-role="checkable-input-svg-wrapper"] circle {
        fill: var(--input-typical-icon-disabled);
      }
    `}
  `}

  ${margin};
`;

export default RadioButtonStyle;

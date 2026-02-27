import styled, { css } from "styled-components";
import { margin } from "styled-system";
import HiddenCheckableInputStyle from "../../../../__internal__/checkable-input/hidden-checkable-input.style";
import StyledCheckableInputSvgWrapper from "../../../../__internal__/checkable-input/checkable-input-svg-wrapper.style";
import applyBaseTheme from "../../../../style/themes/apply-base-theme";
import addFocusStyling from "../../../../style/utils/add-focus-styling";

const svgSize = {
  small: {
    size: "var(--global-size-3-xs)",
  },
  medium: {
    size: "var(--global-size-xs)",
  },
  large: {
    size: "var(--global-size-s)",
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
    ${StyledCheckableInputSvgWrapper}, svg {
      border-radius: 999px;
    }

    ${HiddenCheckableInputStyle} {
      position: absolute;
      box-sizing: border-box;
      min-height: var(--global-size-xs);
    }

    ${HiddenCheckableInputStyle},
    ${StyledCheckableInputSvgWrapper},
    svg {
      height: ${svgSize[$size].size};
      width: ${svgSize[$size].size};
    }

    svg {
      box-sizing: border-box;
      background-color: var(--input-typical-bg-default);
      border: 1px solid var(--input-typical-border-default);

      ${!$isDisabled &&
      $error &&
      /* istanbul ignore next */
      css`
        border: 2px solid var(--input-validation-border-error);
      `}
    }

    ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
      fill: var(--input-typical-icon-active);
    }

    ${HiddenCheckableInputStyle}:not([disabled]) {
      &:focus
        + ${StyledCheckableInputSvgWrapper},
        &:hover
        + ${StyledCheckableInputSvgWrapper} {
        ${addFocusStyling()}
      }
    }

    ${$isDisabled &&
    css`
      svg {
        border: 1px solid var(--input-typical-border-disabled);
        background-color: var(--input-typical-bg-disabled);
      }

      circle {
        fill: var(--input-typical-bg-disabled);
      }

      ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
        fill: var(--input-typical-icon-disabled);
      }
    `}
  `}

  ${margin};
`;

export default RadioButtonStyle;

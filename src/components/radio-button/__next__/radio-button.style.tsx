import styled, { css } from "styled-components";
import { margin } from "styled-system";
import HiddenCheckableInputStyle from "../../../__internal__/checkable-input/hidden-checkable-input.style";
import StyledCheckableInputSvgWrapper from "../../../__internal__/checkable-input/checkable-input-svg-wrapper.style";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import addFocusStyling from "../../../style/utils/add-focus-styling";

const svgSize = {
  small: {
    size: "var(--global-size3xs, 16px)",
    radius: 4.285,
  },
  medium: {
    size: "var(--global-size-xs, 24px)",
    radius: 4.09,
  },
  large: {
    size: "var(--global-size-s, 32px)",
    radius: 4,
  },
};

interface RadioButtonStyleProps {
  disabled?: boolean;
  size: "small" | "medium" | "large";
  error?: boolean;
}

const RadioButtonStyle = styled.div.attrs(
  applyBaseTheme,
)<RadioButtonStyleProps>`
  ${({ disabled, size, error }) => css`
    ${StyledCheckableInputSvgWrapper}, svg {
      border-radius: 999px;
    }

    ${HiddenCheckableInputStyle} {
      position: absolute;
      box-sizing: border-box;
      min-height: var(--global-size-xs, 24px);
    }

    ${HiddenCheckableInputStyle},
    ${StyledCheckableInputSvgWrapper},
    svg {
      height: ${svgSize[size].size};
      width: ${svgSize[size].size};
    }

    svg {
      box-sizing: border-box;
      background-color: var(--input-typical-bg-default, #fff);
      border: 1px solid var(--input-typical-border-default, #668494);
      ${!disabled &&
      css`
        /* istanbul ignore next */
        ${error &&
        `border: 2px solid var(--input-validation-border-error, #DB004E);`}
      `}
    }

    circle {
      r: ${svgSize[size].radius};
    }

    ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
      fill: var(--input-typical-icon-active, #000);
    }

    ${HiddenCheckableInputStyle}:not([disabled]) {
      &:focus
        + ${StyledCheckableInputSvgWrapper},
        &:hover
        + ${StyledCheckableInputSvgWrapper} {
        ${addFocusStyling()}
      }
    }

    ${disabled &&
    css`
      svg {
        border: 1px solid
          var(--input-typical-border-disabled, rgba(0, 0, 0, 0.3));
        background-color: var(--input-typical-bg-disabled, #eee);
      }

      circle {
        fill: var(--input-typical-bg-disabled, #eee);
      }

      ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
        fill: var(--input-typical-icon-disabled, rgba(0, 0, 0, 0.42));
      }
    `}
  `}

  ${margin};
`;

export default RadioButtonStyle;

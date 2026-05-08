import styled, { css } from "styled-components";
import sizes from "../legacy-input/input-sizes.style";
import { ValidationProps } from "../validations";
import addFocusStyling from "../../style/utils/add-focus-styling";

interface InputIconToggleStyleProps extends ValidationProps {
  $size?: "small" | "medium" | "large";
  $disabled?: boolean;
  $readOnly?: boolean;
  $blockFocusStyling?: boolean;
}

const InputIconToggleStyle = styled.span<
  InputIconToggleStyleProps & { tabIndex?: number }
>`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-self: stretch;

  ${({ $size = "medium" }) => css`
    width: ${sizes[$size].height};
  `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
    `}
  
  ${({ $readOnly }) =>
    $readOnly &&
    css`
      cursor: default;
    `}

  ${({ $blockFocusStyling }) =>
    !$blockFocusStyling &&
    css`
      &:focus {
        ${addFocusStyling()}
      }
    `}

  .pager-size-options & {
    margin-left: 0;
    width: 20px;
    height: 24px;
    align-self: center;
  }

  .multi-select &,
  .filterable-select & {
    cursor: pointer;
  }
`;

export default InputIconToggleStyle;

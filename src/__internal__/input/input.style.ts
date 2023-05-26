import styled, { css } from "styled-components";
import { CommonInputProps } from "./input.component";
import addFocusStyling from "../../style/utils/add-focus-styling";

const oldFocusStyling = `
  &:focus {
    outline: solid 3px var(--colorsSemanticFocus500);
  }
`;

const StyledInput = styled.input<
  Pick<CommonInputProps, "align" | "disabled" | "readOnly">
>`
  background: transparent;
  border: none;
  border-radius: var(--borderRadius050);
  color: var(--colorsUtilityYin090);
  flex-grow: 1;
  font-size: var(--fontSizes100);
  outline: none;
  padding: 0;
  margin: 0;
  width: 30px;

  &:-webkit-autofill {
    background-clip: text;
    -webkit-background-clip: text;
  }

  &:focus {
    ${({ theme }) =>
      `${theme.focusRedesignOptOut ? oldFocusStyling : addFocusStyling()}`};
  }

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}

  &::placeholder {
    color: var(--colorsUtilityYin030);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--colorsUtilityYin030);
      cursor: not-allowed;
    `}

  ${({ readOnly }) =>
    readOnly &&
    css`
      color: var(--colorsActionMinorYin090);
    `}
`;

export default StyledInput;

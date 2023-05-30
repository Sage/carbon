import styled, { css } from "styled-components";
import addFocusStyling from "../../style/utils/add-focus-styling";
import sizes from "../input/input-sizes.style";
import { ValidationProps } from "../validations";

const oldFocusStyling = `
  outline: solid 3px var(--colorsSemanticFocus500);
`;

export interface InputIconToggleStyleProps extends ValidationProps {
  size?: "small" | "medium" | "large";
  onClick?: (
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLSpanElement>
  ) => void;
}

const InputIconToggleStyle = styled.span.attrs(
  ({ onClick }: InputIconToggleStyleProps) => ({
    onKeyDown: (event: React.KeyboardEvent<HTMLSpanElement>) => {
      if (onClick && (event.key === " " || event.key === "Enter")) {
        event.preventDefault();
        return onClick(event);
      }

      return event;
    },
  })
)<InputIconToggleStyleProps & { tabIndex?: number }>`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${({ size = "medium" }) => css`
    width: ${sizes[size].height};
  `}

  ${({ theme }) =>
    `
    :focus {
      ${theme.focusRedesignOptOut ? oldFocusStyling : addFocusStyling()}
    }  
  `}
`;

export default InputIconToggleStyle;

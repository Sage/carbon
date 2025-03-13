import styled, { css } from "styled-components";
import sizes from "../input/input-sizes.style";
import { ValidationProps } from "../validations";
import addFocusStyling from "../../style/utils/add-focus-styling";

export interface InputIconToggleStyleProps extends ValidationProps {
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: (
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLSpanElement>,
  ) => void;
}

const InputIconToggleStyle = styled.span.attrs<InputIconToggleStyleProps>(
  ({ onClick }) => ({
    onKeyDown: (event: React.KeyboardEvent<HTMLSpanElement>) => {
      if (onClick && (event.key === " " || event.key === "Enter")) {
        event.preventDefault();
        return onClick(event);
      }

      return event;
    },
  }),
)<InputIconToggleStyleProps & { tabIndex?: number }>`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${({ size = "medium" }) => css`
    width: ${sizes[size].height};
  `}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
  
  ${({ readOnly }) =>
    readOnly &&
    css`
      cursor: default;
    `}

    &:focus {
    ${addFocusStyling()}
  }
`;

export default InputIconToggleStyle;

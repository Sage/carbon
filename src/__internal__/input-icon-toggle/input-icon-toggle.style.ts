import styled, { css } from "styled-components";
import sizes from "../input/input-sizes.style";
import { ValidationProps } from "../validations";

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

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--colorsSemanticFocus500),
      0 0 0 4px var(--colorsUtilityYin090);
  }
`;

export default InputIconToggleStyle;

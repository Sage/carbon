import styled, { css } from "styled-components";
import StyledIcon from "../../../../icon/icon.style";

const StyledToolbarButton = styled.button.attrs({ type: "button" })`
  background-color: inherit;
  border-radius: var(--borderRadius050);
  border: none;
  cursor: pointer;
  width: 32px;
  font-size: 14px;
  height: 32px;

  ${StyledIcon} {
    width: auto;
  }

  ${({ isActive }) => css`
    :focus,
    :active {
      outline: 2px solid var(--colorsSemanticFocus500);
      outline-offset: -2px;
      border-radius: var(--borderRadius050);
    }

    :hover {
      background-color: var(--colorsActionMinor200);
      border-radius: var(--borderRadius050);
    }

    ${isActive &&
    css`
      background-color: var(--colorsActionMinor200);
    `}
  `}
`;

export default StyledToolbarButton;

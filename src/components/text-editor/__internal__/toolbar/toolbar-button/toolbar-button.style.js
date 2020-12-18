import styled, { css } from "styled-components";
import baseTheme from "../../../../../style/themes/base";
import StyledIcon from "../../../../icon/icon.style";

const StyledToolbarButton = styled.button.attrs({ type: "button" })`
  background-color: inherit;
  border: none;
  cursor: pointer;
  width: 32px;
  font-size: 14px;
  height: 32px;

  ${StyledIcon} {
    width: auto;
  }

  ${({ theme, isActive }) => css`
    :focus,
    :active {
      outline: 2px solid ${theme.colors.focus};
      outline-offset: -2px;
    }

    :hover {
      background-color: ${theme.editor.button.hover};
    }

    ${isActive &&
    css`
      background-color: ${theme.editor.button.hover};
    `}
  `}
`;

StyledToolbarButton.defaultProps = {
  theme: baseTheme,
};

export default StyledToolbarButton;

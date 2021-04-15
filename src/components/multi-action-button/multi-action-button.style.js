import styled, { css } from "styled-components";
import { margin } from "styled-system";
import StyledButton from "../button/button.style";
import baseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";

const StyledMultiActionButton = styled.div`
  ${margin}

  display: inline-block;
  position: relative;

  & > ${StyledButton} {
    margin: 0;

    ${StyledIcon} {
      margin-left: 0;
      left: 8px;
    }

    &:focus {
      border: 3px solid ${({ theme }) => theme.colors.focus};
      outline: none;
      margin: -1px;
    }

    ${({ displayed, theme }) =>
      displayed &&
      css`
        background-color: ${theme.colors.secondary};
        border-color: ${theme.colors.secondary};

        &,
        ${StyledIcon} {
          color: ${theme.colors.white};
        }

        &:focus {
          border-color: ${theme.colors.focus};
          margin: 0 -1px;
        }
      `}
  }
`;

const StyledButtonChildrenContainer = styled.div`
  ${({ theme, align }) => css`
    background-color: ${theme.colors.secondary};
    min-width: ${({ minWidth }) => minWidth}px;
    white-space: nowrap;
    z-index: ${theme.zIndex.popover};

    ${StyledIcon} {
      margin-left: 0;
      left: 8px;
    }

    ${StyledButton} {
      background-color: ${theme.colors.secondary};
      border: 1px solid ${theme.colors.secondary};
      color: ${theme.colors.white};
      display: block;
      margin-left: 0;
      margin-top: 3px;
      margin-bottom: 3px;
      min-width: 100%;
      text-align: ${align};
      z-index: ${theme.zIndex.overlay};

      &:focus,
      &:hover {
        background-color: ${theme.colors.tertiary};
      }

      & + & {
        margin-top: 3px;
      }
    }
  `}
`;

StyledButtonChildrenContainer.defaultProps = {
  theme: baseTheme,
};

StyledMultiActionButton.defaultProps = {
  theme: baseTheme,
  size: "medium",
  legacyColorVariant: "blue",
};

export { StyledButtonChildrenContainer, StyledMultiActionButton };

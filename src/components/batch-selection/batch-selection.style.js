import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";
import StyledIconButton from "../icon-button/icon-button.style";
import StyledIcon from "../icon/icon.style";

const StyledBatchSelection = styled.div`
  ${({ disabled, colorTheme, theme, hidden }) => css`
    align-items: center;
    display: inline-flex;

    ${hidden && "opacity: 0;"}

    ${colorTheme === "dark" &&
    css`
      background-color: ${theme.colors.slate};
      color: ${theme.colors.white};

      ${StyledIcon} {
        color: ${theme.colors.white};
      }
    `}

    ${colorTheme === "light" &&
    css`
      background-color: ${theme.batchSelection.lightTheme};
    `}

    ${colorTheme === "white" &&
    css`
      background-color: ${theme.white};
      box-shadow: ${theme.shadows.depth1};
    `}

    ${StyledIconButton} {
      margin: 0;
      position: static;
      padding: 10px;
    }

    ${StyledIconButton}:hover {
      background-color: ${theme.colors.base};

      ${StyledIcon} {
        color: ${theme.colors.white};
      }
    }

    ${disabled &&
    css`
      background: transparent;
      color: ${theme.disabled.disabled};
      cursor: not-allowed;

      ${StyledIconButton} {
        background: transparent;
        pointer-events: none;

        ${StyledIcon} {
          color: ${theme.icon.disabled};
        }
      }
    `}
  `}
`;

StyledBatchSelection.defaultProps = {
  theme: baseTheme,
};

const StyledSelectionCount = styled.span`
  display: inline-block;
  padding: 10px 15px;
`;

export { StyledBatchSelection, StyledSelectionCount };

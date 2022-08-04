import styled, { css } from "styled-components";
import Box from "../box";
import StyledIcon from "../icon/icon.style";

export interface StyledDismissibleBoxProps {
  /** Flag to control whether the thicker left border highlight should be rendered */
  hasBorderLeftHighlight?: boolean;
  /** Set the base color variant */
  variant?: "light" | "dark";
}

const StyledDismissibleBox = styled(Box)<StyledDismissibleBoxProps>`
  ${({ hasBorderLeftHighlight = true, variant = "light" }) => css`
    background-color: ${variant === "light"
      ? "#FFFFFF"
      : "var(--colorsUtilityMajor050)"};

    border: 1px solid var(--colorsUtilityMajor100);
    display: flex;
    justify-content: space-between;
    word-break: break-word;

    ${hasBorderLeftHighlight &&
    `
      border-left: none;
      box-shadow: -4px 0 0 0 var(--colorsUtilityMajor400);
    `}

    ${StyledIcon}:hover {
      color: var(--colorsActionMinor600);
    }
  `}
`;

export { StyledDismissibleBox };

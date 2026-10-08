import styled, { css } from "styled-components";
import Box, { BorderRadiusType } from "../box/box.component";
import StyledIcon from "../icon/icon.style";

export interface StyledDismissibleBoxProps {
  /** Flag to control whether the thicker left border highlight should be rendered */
  hasBorderLeftHighlight?: boolean;
  /** Set the base color variant */
  variant?: "light" | "dark";
}

const borderRadiusTokens: Record<string, string> = {
  borderRadius000: "var(--global-radius-none)",
  borderRadius010: "var(--global-radius-container-3-xs)",
  borderRadius025: "var(--global-radius-container-2-xs)",
  borderRadius050: "var(--global-radius-container-xs)",
  borderRadius100: "var(--global-radius-container-m)",
  borderRadius200: "var(--global-radius-container-l)",
  borderRadius400: "var(--global-radius-container-2-xl)",
  borderRadiusCircle: "var(--global-radius-container-circle)",
};

const getBorderRadius = (borderRadius: BorderRadiusType) =>
  borderRadius
    .split(" ")
    .map((token) => borderRadiusTokens[token])
    .join(" ");

const StyledDismissibleBox = styled(Box)<
  StyledDismissibleBoxProps & { $borderRadius: BorderRadiusType }
>`
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

  border-radius: ${({ $borderRadius }) => getBorderRadius($borderRadius)};
`;

export { StyledDismissibleBox };

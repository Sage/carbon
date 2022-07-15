import styled, { css } from "styled-components";
import Box from "../box";
import StyledIcon from "../icon/icon.style";

export interface StyledDismissibleBoxProps {
  hasBorderLeftHighlight?: boolean;
}

const StyledDismissibleBox = styled(Box)<StyledDismissibleBoxProps>`
  ${({ hasBorderLeftHighlight }) => css`
    word-break: break-word;

    border: 1px solid var(--colorsUtilityMajor100);

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

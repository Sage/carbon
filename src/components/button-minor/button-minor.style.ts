import styled, { css } from "styled-components";
import Button from "../../__internal__/__legacy__/button/button.component";
import { ButtonMinorProps } from "./button-minor.component";

import StyledIcon from "../icon/icon.style";
import StyledLoaderSquare from "../loader/loader-square.style";

function makeColors(color: string) {
  return `
    color: ${color};
    ${StyledIcon} {
      color: ${color};
    }
    ${StyledLoaderSquare} {
      background-color: ${color};
    }
  `;
}

const StyledButtonMinor = styled(Button)<ButtonMinorProps>`
  border-radius: var(--borderRadius050);

  ${({ children }) =>
    !children &&
    css`
      ${StyledIcon} {
        position: absolute;
      }
    `}

  ${({ buttonType, destructive, disabled }) =>
    !destructive &&
    !disabled &&
    css`
      ${buttonType === "primary" &&
      `
        background: var(--colorsActionMinor500);
        border-color: var(--colorsActionMinorTransparent);
        ${makeColors("var(--colorsActionMinorYang100)")}
        &:hover {
          background: var(--colorsActionMinor600);
        }
      `}

      ${buttonType === "secondary" &&
      `
        background: transparent;
        padding: var(--spacing100);
        border-color: var(--colorsActionMinor500);
        ${makeColors("var(--colorsActionMinor500)")}
        &:hover {
          color: var(--colorsActionMinorYang100);
          background: var(--colorsActionMinor600);
        }
      `}

      ${buttonType === "tertiary" &&
      `
        background: transparent;
        padding: var(--spacing100);
        ${makeColors("var(--colorsActionMinor500)")}
        &:hover {
          color: var(--colorsActionMinorYang100);
          background: var(--colorsActionMinor600);
        }
      `}
    `}
    
    ${({ isInPassword, disabled }) =>
    isInPassword &&
    !disabled &&
    css`
      ${StyledIcon} {
        color: var(--colorsUtilityMajor300);
      }

      &:hover {
        ${StyledIcon} {
          color: var(--colorsUtilityMajor300);
        }
        color: var(--colorsActionMinor500);
        background: transparent;
      }
    `}

  ${({ size }) => css`
    ${size === "small" &&
    `
      min-height: var(--sizing400);
      padding: var(--spacing000) var(--spacing100) var(--spacing000)
        var(--spacing100);
    `}

    ${size === "medium" &&
    `
      padding-left: var(--spacing150);
      padding-right: var(--spacing150);
    `}

    ${size === "large" &&
    `
      padding-left: var(--spacing200);
      padding-right: var(--spacing200);
    `}
  `}
`;

export default StyledButtonMinor;

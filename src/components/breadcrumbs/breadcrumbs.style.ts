import styled, { css } from "styled-components";

import StyledIcon from "../icon/icon.style";
import StyledLoaderSquare from "../loader/loader-square.style";
import Breadcrumbs from "./breadcrumbs.component";

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

const StyledBreadcrumbs = styled(Breadcrumbs)`
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
    `}
  ${({ size }) => css`
    ${size === "small" &&
    `
      min-height: 32px;
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

export default StyledBreadcrumbs;

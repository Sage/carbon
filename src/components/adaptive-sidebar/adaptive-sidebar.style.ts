import styled, { css } from "styled-components";

import { margin, MarginProps, padding, PaddingProps } from "styled-system";

import Box from "../box";
import Sidebar, { SidebarProps } from "../sidebar";

import { AdaptiveSidebarProps } from "./adaptive-sidebar.component";

const getColors = (
  backgroundColor: AdaptiveSidebarProps["backgroundColor"],
) => {
  switch (backgroundColor) {
    case "app":
      return `
        background-color: var(--colorsUtilityMajor025);
        color: var(--colorsUtilityYin090);
      `;
    case "black":
      return `
        background-color: var(--colorsUtilityYin100);
        color: var(--colorsUtilityYang100);
      `;
    case "white":
    default:
      return `
        background-color: var(--colorsUtilityYang100);
        color: var(--colorsUtilityYin090);
      `;
  }
};

type StyledAdaptiveSidebarProps = Pick<
  AdaptiveSidebarProps,
  "backgroundColor" | "height" | "width"
> &
  MarginProps &
  PaddingProps & {
    reduceMotion?: boolean;
    transitionTime?: number;
  };

const StyledAdaptiveSidebar = styled(Box)<StyledAdaptiveSidebarProps>`
  ${({ backgroundColor, height, reduceMotion, transitionTime, width }) => css`
    ${getColors(backgroundColor)}
    border-left: 1px solid var(--colorsUtilityMajor050);
    max-height: ${height};
    max-width: ${width};
    min-width: ${width};
    overflow-y: auto;

    ${margin}
    ${padding}

    ${!reduceMotion &&
    css`
      &.enter,
      &.appear {
        opacity: 0;
      }

      &.enter-active,
      &.appear-active {
        opacity: 1;
        transition: all ${transitionTime}ms ease-out;
      }

      &.exit {
        opacity: 1;
      }

      &.exit-active {
        opacity: 0;
        transition: all ${transitionTime}ms ease-out;
      }
    `}
  `}
`;

interface StyledSidebarProps extends SidebarProps {
  backgroundColor: "app" | "black" | "white";
}

const StyledSidebar = styled(Sidebar)<StyledSidebarProps>`
  ${({ backgroundColor }) => css`
    div[data-element="sidebar-content"] {
      ${getColors(backgroundColor)}
    }
  `}
`;

export { StyledAdaptiveSidebar, StyledSidebar };

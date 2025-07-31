import styled, { css } from "styled-components";

import { margin, MarginProps, padding, PaddingProps } from "styled-system";

import Box from "../box";
import Sidebar, { SidebarProps } from "../sidebar";

import { AdaptiveSidebarProps } from "./adaptive-sidebar.component";

import { getColors } from "./__internal__/utils";

type StyledAdaptiveSidebarProps = Pick<
  AdaptiveSidebarProps,
  "backgroundColor" | "borderColor" | "height" | "width"
> &
  MarginProps &
  PaddingProps & {
    tabIndex: number;
  };

const StyledAdaptiveSidebar = styled(Box)<StyledAdaptiveSidebarProps>`
  ${({ backgroundColor, borderColor, height, hidden, width }) => css`
    ${getColors(backgroundColor)}
    ${borderColor &&
    css`
      border-left: 1px solid var(${borderColor});
    `}
    ${hidden &&
    css`
      display: none;
    `}
    max-height: ${height};
    max-width: ${width};
    min-width: ${width};
    overflow-y: auto;

    ${margin}
    ${padding}
  `};
`;

interface StyledSidebarProps extends SidebarProps {
  backgroundColor: "app" | "black" | "white";
  hidden?: boolean;
}

const StyledSidebar = styled(Sidebar)<StyledSidebarProps>`
  ${({ hidden }) => css`
    ${hidden &&
    css`
      display: none;
    `}
  `}
  ${({ backgroundColor }) => css`
    div[data-element="sidebar-content"] {
      ${getColors(backgroundColor)}
    }
  `}
`;

export { StyledAdaptiveSidebar, StyledSidebar };

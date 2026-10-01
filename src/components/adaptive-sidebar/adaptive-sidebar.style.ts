import styled, { css } from "styled-components";

import { margin, MarginProps, padding, PaddingProps } from "styled-system";

import Sidebar, { SidebarProps } from "../sidebar";
import applyBaseTheme from "../../style/themes/apply-base-theme";

import { AdaptiveSidebarProps } from "./adaptive-sidebar.component";

import { getColors } from "./__internal__/utils";

type StyledAdaptiveSidebarProps = MarginProps &
  PaddingProps & {
    $backgroundColor: AdaptiveSidebarProps["backgroundColor"];
    $borderColor?: AdaptiveSidebarProps["borderColor"];
    $height: AdaptiveSidebarProps["height"];
    $width: AdaptiveSidebarProps["width"];
  };

const StyledAdaptiveSidebar = styled.div.attrs(
  applyBaseTheme,
)<StyledAdaptiveSidebarProps>`
  ${({ $backgroundColor, $borderColor, $height, hidden, $width }) => css`
    ${getColors($backgroundColor)}
    ${$borderColor &&
    css`
      border-left: 1px solid var(${$borderColor});
    `}
    ${hidden &&
    css`
      display: none;
    `}
    max-height: ${$height};
    max-width: ${$width};
    min-width: ${$width};
    overflow-y: auto;
    outline: none;

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

import styled, { css } from "styled-components";

import { smallScreenBreakpoint } from "../../sidebar.config";

interface StyledSidebarFooterProps {
  $disableStickyOnSmallScreen?: boolean;
  $sticky?: boolean;
}

const StyledSidebarFooter = styled.div<StyledSidebarFooterProps>`
  background: var(--container-standard-bg-default);
  box-sizing: border-box;
  display: flex;
  gap: var(--global-space-layout-2-xs);
  min-height: var(--global-size-3-xl);
  padding: var(--global-space-comp-l) var(--global-space-comp-xl);
  width: 100%;

  ${({ $sticky }) =>
    $sticky &&
    css`
      border-top: var(--global-borderwidth-xs) solid
        var(--container-standard-border-default);
      box-shadow: var(--global-depth-sticky-b);
      position: sticky;
      bottom: 0;
    `}

  ${({ $disableStickyOnSmallScreen }) =>
    $disableStickyOnSmallScreen &&
    css`
      @media screen and (max-width: ${smallScreenBreakpoint}) {
        box-shadow: none;
        position: static;
      }
    `}
`;

export default StyledSidebarFooter;

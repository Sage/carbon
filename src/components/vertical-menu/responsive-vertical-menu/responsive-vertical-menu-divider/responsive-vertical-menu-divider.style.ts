import styled from "styled-components";
import { margin, MarginProps } from "styled-system";

interface StyledResponsiveVerticalMenuDividerProps {
  depth: number;
  responsive?: boolean;
}

export const StyledResponsiveVerticalMenuDivider = styled.div<StyledResponsiveVerticalMenuDividerProps>`
  ${margin}
  ${({ depth, responsive }) => depth > 0 && responsive && `max-width: 88%`};
`;

export const StyledHr = styled.hr<MarginProps>`
  border: none;
  border-bottom: var(--global-borderwidth-xs) solid var(--nav-primary-divider);
  margin: var(--global-space-comp-s) var(--global-space-none);
`;

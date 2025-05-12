import styled from "styled-components";
import { margin, MarginProps } from "styled-system";

interface StyledResponsiveVerticalMenuDividerProps {
  depth: number;
  responsive?: boolean;
}

export const StyledResponsiveVerticalMenuDivider = styled.div<StyledResponsiveVerticalMenuDividerProps>`
  width: ${({ depth, responsive }) =>
    depth > 0 && responsive ? "88%" : "100%"};
`;

export const StyledHr = styled.hr<MarginProps>`
  border-color: #ffffff33;
  border-bottom: 1px;
  ${margin}
`;

import type { MarginProps } from "../../../../style/utils/spacing";
import { margin } from "../../../../style/utils/spacing";
import styled from "styled-components";

interface StyledResponsiveVerticalMenuDividerProps {
  depth: number;
  responsive?: boolean;
}

export const StyledResponsiveVerticalMenuDivider = styled.div<StyledResponsiveVerticalMenuDividerProps>`
  ${margin}
  ${({ depth, responsive }) => depth > 0 && responsive && `max-width: 88%`};
`;

export const StyledHr = styled.hr<MarginProps>`
  border-color: #ffffff33;
  border-bottom: 1px;
`;

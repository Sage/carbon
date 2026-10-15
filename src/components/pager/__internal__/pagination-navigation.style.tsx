import styled, { css } from "styled-components";

const sizeMap = {
  small: {
    width: "var(--global-size-s)",
  },
  medium: {
    width: "var(--global-size-m)",
  },
};

interface StyledPaginationNavigationProps {
  $alignment?: "fill" | "centred";
}

export const StyledPaginationNavigation = styled.div<StyledPaginationNavigationProps>`
  ${({ $alignment }) => css`
    display: flex;
    align-items: center;
    gap: var(--global-space-comp-xs);
    flex: 1 0 0;

    ${$alignment === "centred" &&
    css`
      justify-content: center;
    `}
  `}
`;

export const StyledButtonWrapper = styled.div<{ $visible?: boolean }>`
  ${({ $visible }) => css`
    visibility: ${$visible ? "visible" : "hidden"};
  `}
`;

export const StyledCurrentPageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--global-space-comp-s);
  white-space: nowrap;
`;

export const StyledCurrentPage = styled.span`
  padding: 0 var(--global-space-layout-3-xs);
  white-space: nowrap;
`;

export const StyledInputWrapper = styled.div<{
  $size: "small" | "medium";
}>`
  ${({ $size }) => css`
    min-width: ${sizeMap[$size].width};

    && input {
      text-align: center;
      field-sizing: content;
    }
  `}
`;

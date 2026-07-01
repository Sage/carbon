import styled, { css } from "styled-components";

const sizeMap = {
  small: {
    width: "var(--global-size-s)",
  },
  medium: {
    width: "var(--global-size-m)",
  },
  large: {
    width: "var(--global-size-l)",
  },
};

export const StyledPaginationNavigation = styled.div<{
  $interactivePageNumber?: boolean;
}>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${({ $interactivePageNumber }) =>
    $interactivePageNumber &&
    css`
      gap: var(--global-space-comp-l);
    `}
`;

export const StyledNavigationButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--global-space-comp-xs);
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
`;

export const StyledCurrentPage = styled.span`
  padding: 0 var(--global-space-layout-3-xs);
`;

export const StyledInputWrapper = styled.div<{
  $size: "small" | "medium" | "large";
}>`
  ${({ $size }) => css`
    min-width: ${sizeMap[$size].width};

    && input {
      text-align: center;
      field-sizing: content;
    }
  `}
`;

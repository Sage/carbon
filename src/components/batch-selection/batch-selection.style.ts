import styled, { css } from "styled-components";

export interface StyledBatchSelectionProps {
  $hidden?: boolean;
}

export const StyledBatchSelection = styled.div<StyledBatchSelectionProps>`
  ${({ $hidden }) => css`
    min-width: 288px;
    width: 100%;

    ${$hidden &&
    css`
      display: none;
    `}
  `};
`;

export interface StyledWrapperProps {
  $smallScreen?: boolean;
}

export const StyledWrapper = styled.div<StyledWrapperProps>`
  ${({ $smallScreen }) => css`
    display: flex;
    align-items: center;
    flex: 1 0 0;
    padding: var(--global-space-layout-2-xs);
    gap: var(--global-space-layout-2-xs);
    white-space: nowrap;

    ${$smallScreen &&
    css`
      flex-direction: column;
      justify-content: space-between;
      gap: var(--global-space-comp-xs);
    `}
  `};
`;

export const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const StyledContent = styled.div<StyledWrapperProps>`
  ${({ $smallScreen }) => css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    ${!$smallScreen &&
    css`
      flex: 1 0 0;
      gap: var(--global-space-layout-2-xs);
    `}

    ${$smallScreen &&
    css`
      width: 100%;
      justify-content: flex-start;
      padding-top: var(--global-space-comp-s);
      gap: var(--global-space-comp-xl);
    `}
  `};
`;

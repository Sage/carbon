import styled, { css } from "styled-components";

import Link from "../link";

const StyledSelectContainer = styled.div`
  height: 26px;
  width: 64px;
  margin-left: 8px;
  margin-right: 8px;
`;

interface StyledPagerContainerProps {
  variant?: "alternate" | "default";
  smallScreenBreakpoint?: string;
  showPageSizeSelection?: boolean;
  showTotalRecords?: boolean;
}

const StyledPagerContainer = styled.div<StyledPagerContainerProps>`
  box-sizing: border-box;
  display: grid;
  align-items: center;
  justify-content: space-between;
  padding: var(--sizing050) var(--sizing300);
  width: 100%;
  min-height: var(--sizing550);
  font-size: var(--fontSizes100);
  color: var(--colorsUtilityYin090);
  border: 1px solid var(--colorsUtilityMajor100);
  border-radius: var(--borderRadius100);
  grid-template-columns: repeat(3, 1fr);
  flex-wrap: wrap;

  ${({ smallScreenBreakpoint, showPageSizeSelection, showTotalRecords }) =>
    smallScreenBreakpoint &&
    css`
      @media (max-width: ${smallScreenBreakpoint}) {
        grid-template-columns: 1fr;
        padding: var(--sizing050) var(--sizing100);

        ${(showPageSizeSelection || showTotalRecords) &&
        css`
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        `}
      }
    `}

  ${({ variant }) => css`
    background-color: ${variant === "alternate"
      ? "var(--colorsUtilityMajor040)"
      : "var(--colorsUtilityMajor010)"};
  `}
`;

const StyledPagerSizeOptions = styled.div`
  grid-area: 1 / 1 / 1 / 1;
`;

const StyledPagerSizeOptionsInner = styled.div`
  display: flex;
  align-items: center;
`;

interface StyledPagerProps {
  smallScreenBreakpoint?: string;
}

const StyledPagerNavigation = styled.div<StyledPagerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 var(--spacing200);
  gap: var(--spacing400);
  grid-area: 1 / 2 / 1 / 2;

  ${({ smallScreenBreakpoint }) =>
    smallScreenBreakpoint &&
    css`
      @media (max-width: ${smallScreenBreakpoint}) {
        padding: 0;
        gap: var(--spacing200);
        grid-area: 2 / 1 / 2 / 3;
      }
    `}
`;

const StyledPagerNavInner = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPagerNavLabel = styled.label`
  white-space: nowrap;
`;

interface StyledPagerLinkProps {
  hideDisabledButtons?: boolean;
}

const StyledPagerLink = styled(Link)<StyledPagerLinkProps>`
  ${({ hideDisabledButtons }) =>
    hideDisabledButtons &&
    css`
      & {
        visibility: hidden;
      }
    `}
`;

const StyledPagerNoSelect = styled.div`
  user-select: none;
  white-space: nowrap;
  font-weight: normal;
`;

const StyledPagerSummary = styled.div<StyledPagerProps>`
  justify-self: end;
  white-space: nowrap;
  grid-area: 1 / 3 / 1 / 3;

  ${({ smallScreenBreakpoint }) =>
    smallScreenBreakpoint &&
    css`
      @media (max-width: ${smallScreenBreakpoint}) {
        grid-area: 1 / 2 / 1 / 2;
      }
    `}
`;

export {
  StyledPagerContainer,
  StyledPagerSizeOptions,
  StyledPagerSizeOptionsInner,
  StyledPagerNavigation,
  StyledPagerNavInner,
  StyledPagerNavLabel,
  StyledPagerLink,
  StyledPagerNoSelect,
  StyledPagerSummary,
  StyledSelectContainer,
};

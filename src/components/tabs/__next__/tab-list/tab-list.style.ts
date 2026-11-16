import styled, { css } from "styled-components";
import { sizes } from "../tab/tab.style";

interface StyledTabListProps {
  $orientation?: "horizontal" | "vertical";
}

export const StyledTabList = styled.div<StyledTabListProps>`
  ${({ $orientation }) => css`
    display: flex;
    width: 100%;
    overflow-x: hidden;
    align-items: ${$orientation === "vertical" ? "stretch" : "end"};

    ${$orientation === "vertical" &&
    css`
      flex-direction: column;
      flex-wrap: wrap;
    `}
  `}
`;

export const StyledTabListWrapper = styled.div<{ $headerWidth?: string }>`
  display: flex;
  z-index: 6;
  align-items: end;

  ${({ $headerWidth }) =>
    $headerWidth &&
    css`
      width: ${$headerWidth};
    `};
`;

export const Spacer = styled.div`
  align-self: flex-end;
  background: var(--tab-border-default);
  flex-grow: 1;
  height: var(--global-borderwidth-s);
`;

interface StyledScrollButtonProps {
  $size: "medium" | "large";
}

export const StyledScrollButton = styled.button<StyledScrollButtonProps>`
  ${({ $size }) => css`
    cursor: pointer;
    min-height: ${sizes[$size].minHeight};
    min-width: ${sizes[$size].minHeight};
    background: var(--tab-nav-bg-default);
    border-radius: var(--global-radius-action-m) var(--global-radius-action-m) 0
      0;
    border: none;
    position: relative;
    z-index: 2;

    ::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border-bottom: var(--global-borderwidth-s) solid var(--tab-border-default);
    }
  `}
`;

export const StyledScrollButtonPlaceholder = styled.div<StyledScrollButtonProps>`
  ${({ $size }) => css`
    min-height: ${sizes[$size].minHeight};
    min-width: ${sizes[$size].minHeight};
    position: relative;

    ::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border-bottom: var(--global-borderwidth-s) solid var(--tab-border-default);
    }
  `}
`;

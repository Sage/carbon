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

interface StyledTabListWrapperProps {
  $orientation?: "horizontal" | "vertical";
  $headerWidth?: string;
}

export const StyledTabListWrapper = styled.div<StyledTabListWrapperProps>`
  display: flex;
  z-index: 6;
  position: relative;

  ${({ $headerWidth, $orientation }) => css`
    ${$headerWidth && `width: ${$headerWidth};`}

    // bottom keyline
    ::after {
      content: "";
      pointer-events: none;
      position: absolute;
      inset: 0;
      border-bottom: var(--global-borderwidth-s) solid var(--tab-border-default);
    }

    ${$orientation === "vertical" &&
    css`
      ::after {
        border-right: var(--global-borderwidth-s) solid
          var(--tab-border-default);
        border-bottom: none;
      }
    `}
  `};
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
    border-radius: var(--global-radius-action-m) var(--global-radius-action-m)
      var(--global-radius-none) var(--global-radius-none);
    border: none;
    position: relative;
    z-index: 2;

    ::before {
      content: "";
      pointer-events: none;
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
      pointer-events: none;
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border-bottom: var(--global-borderwidth-s) solid var(--tab-border-default);
    }
  `}
`;

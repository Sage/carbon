import styled, { css } from "styled-components";

export const StyledScrollableBlock = styled.li`
  [data-last-menu-item="true"] {
    border-bottom-right-radius: var(--global-radius-none);
  }
`;

interface ScrollableContainerProps {
  $height?: string | number;
  $maxHeight?: string | number;
}

export const ScrollableContainer = styled.ul<ScrollableContainerProps>`
  ${({ $height, $maxHeight }) => css`
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-y: scroll;
    overscroll-behavior-y: none;

    ${$height &&
    css`
      height: ${typeof $height === "number" ? `${$height}px` : $height};
    `}
    ${$maxHeight &&
    css`
      max-height: ${typeof $maxHeight === "number"
        ? `${$maxHeight}px`
        : $maxHeight};
    `}
  `}
`;

export default StyledScrollableBlock;

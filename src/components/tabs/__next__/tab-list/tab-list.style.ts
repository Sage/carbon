import styled, { css } from "styled-components";

export const TAB_LIST_FOCUS_PADDING = 6;

interface StyledTabListProps {
  $orientation: "horizontal" | "vertical";
  $scrollRequired: boolean;
}

export const StyledTabList = styled.div<StyledTabListProps>`
  display: flex;
  ${({ $orientation, $scrollRequired }) => css`
    ${$orientation === "horizontal" &&
    css`
      margin-bottom: 8px;

      ${$scrollRequired &&
      css`
        margin-inline: -${TAB_LIST_FOCUS_PADDING}px;
      `}
    `}

    ${$orientation === "vertical" &&
    css`
      flex-direction: column;
      flex-wrap: wrap;
      margin-right: 8px;
    `}
  `}
  width: 100%;
  padding: ${TAB_LIST_FOCUS_PADDING}px;
  overflow-x: hidden;
`;

export const StyledTabListWrapper = styled.div<{ $headerWidth?: string }>`
  display: flex;
  z-index: 6;

  ${({ $headerWidth }) =>
    $headerWidth &&
    css`
      width: ${$headerWidth};
    `};
`;

export const Spacer = styled.div`
  align-self: flex-end;
  background: var(--tab-border-active-alt);
  flex-grow: 1;
  height: 2px;
`;

// Can't be easily tested in Jest owing to lack of an actual DOM
/* istanbul ignore next */
export const StyledScrollButton = styled.button<{
  $size: "medium" | "large";
}>`
  height: ${({ $size }) => ($size === "medium" ? "40px" : "48px")};
  width: ${({ $size }) => ($size === "medium" ? "40px" : "48px")};
  border-radius: var(--global-radius-none);
  border-top-right-radius: var(--global-radius-action-m);
  border-top-left-radius: var(--global-radius-action-m);
  border-color: var(--tab-border-active-alt);
  background: white;
  border: none;
  border-bottom: 2px solid var(--tab-border-active-alt);
  top: 6px;
  position: relative;
  z-index: 2;
`;

// Again, can't be easily tested in Jest owing to lack of an actual DOM
/* istanbul ignore next */
export const StyledScrollButtonPlaceholder = styled.div<{
  $size: "medium" | "large";
}>`
  height: ${({ $size }) => ($size === "medium" ? "40px" : "48px")};
  width: ${({ $size }) => ($size === "medium" ? "40px" : "48px")};
  border-radius: var(--global-radius-none);
  border-color: var(--tab-border-active-alt);
  border: none;
  border-bottom: 2px solid var(--tab-border-active-alt);
  top: 4px;
  position: relative;
`;

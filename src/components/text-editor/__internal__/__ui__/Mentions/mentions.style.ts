import styled, { css } from "styled-components";

export const TypeaheadPopover = styled.div<{
  parentOffsetLeft: number;
  parentOffsetTop: number;
}>`
  background: var(--popover-bg-default);
  box-shadow: var(--global-depth-lvl1);
  border-radius: var(--global-radius-action-m);
  position: relative;
  top: ${({ parentOffsetTop }) => -parentOffsetTop}px;
  left: ${({ parentOffsetLeft }) => -parentOffsetLeft}px;
  width: 250px; /* .mentions-menu class */
`;

const sizeMap = {
  small: {
    listPadding: "var(--global-space-comp-xs) 0",
    listItemFont: "var(--global-font-static-comp-regular-s)",
    listItemPadding:
      "var(--global-space-comp-xs) var(--global-space-comp-m) var(--global-space-comp-xs) var(--global-size-2-xs)",
    listItemMinHeight: "var(--global-size-s)",
    textMarginLeft: "var(--global-space-comp-2-xs)",
  },
  medium: {
    listPadding: "var(--global-space-comp-s) 0",
    listItemFont: "var(--global-font-static-comp-regular-m)",
    listItemPadding:
      "var(--global-space-comp-s) var(--global-space-comp-m) var(--global-space-comp-s) var(--global-space-comp-xl)",
    listItemMinHeight: "var(--global-size-m)",
    textMarginLeft: "var(--global-space-comp-xs)",
  },
  large: {
    listPadding: "var(--global-space-comp-m) 0",
    listItemFont: "var(--global-font-static-comp-regular-l)",
    listItemPadding:
      "var(--global-space-comp-m) var(--global-space-comp-m) var(--global-space-comp-m) var(--global-space-comp-xl)",
    listItemMinHeight: "var(--global-size-l)",
    textMarginLeft: "var(--global-space-comp-xs)",
  },
};

interface MentionsListProps {
  $size: "small" | "medium" | "large";
}

export const MentionsList = styled.ul<MentionsListProps>`
  padding: ${({ $size }) => sizeMap[$size].listPadding};
  list-style: none;
  margin: 0;
  border-radius: var(--global-radius-container-m);
  max-height: 200px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const MentionsListItem = styled.li<MentionsListProps>`
  ${({ $size }) => css`
    box-sizing: border-box;
    padding: ${sizeMap[$size].listItemPadding};
    min-height: ${sizeMap[$size].listItemMinHeight};
    color: var(--input-dropdown-label-default);
    cursor: pointer;
    font: ${sizeMap[$size].listItemFont};
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: var(--popover-bg-default);

    &:hover {
      color: var(--popover-label-hover);
    }

    &.selected {
      background: var(--popover-bg-hover);
      color: var(--popover-label-hover);
    }

    .text {
      display: flex;
      flex-grow: 1;
      min-width: 150px;
      margin-left: ${sizeMap[$size].textMarginLeft};
      align-items: center;
      white-space: pre;
    }

    div[data-component="portrait"] {
      color: var(--input-dropdown-label-default);
      font: var(--profile-font-initials-xs);
      min-width: var(--profile-size-outside-xs);
      height: var(--profile-size-outside-xs);
      overflow: hidden;
      border-radius: var(--global-radius-container-circle);
      border: none;
      box-shadow: inset 0 0 0 var(--global-borderwidth-xs)
        var(--profile-border-default);
      display: inline-block;

      [data-element="initials"],
      [data-component="icon"] {
        color: var(--input-dropdown-label-default);
      }
    }
  `};
`;

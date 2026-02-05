import styled from "styled-components";

export const TypeaheadPopover = styled.div`
  background: var(--popover-bg-default);
  box-shadow: var(--global-depth-lvl1);
  border-radius: var(--global-radius-action-m);
  position: relative;
  width: 250px; /* .mentions-menu class */
`;

export const MentionsList = styled.ul`
  padding: var(--global-space-comp-s) 0;
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

export const MentionsListItem = styled.li`
  padding: var(--global-space-comp-s) var(--global-space-comp-xl);
  color: var(--input-dropdown-label-default);
  cursor: pointer;
  font: var(--global-font-static-comp-regular-m);
  display: flex;
  align-content: center;
  flex-direction: row;
  flex-shrink: 0;
  background-color: var(--popover-bg-default);
  border-radius: 0;
  border: 0;

  &:hover {
    color: var(--popover-label-hover);
    border-radius: 0;

    div[data-component="portrait"] {
      color: var(--popover-label-hover);

      [data-element="initials"],
      [data-component="icon"] {
        color: var(--popover-label-hover);
      }
    }
  }

  /* Ask Damo what the purpose of this actually is
    &.active {
      display: flex;
      width: 20px;
      height: 20px;
      background-size: contain;
    }
  */

  &.selected {
    background: var(--popover-bg-hover);
    color: var(--popover-label-hover);

    div[data-component="portrait"] {
      color: var(--popover-label-hover);

      [data-element="initials"],
      [data-component="icon"] {
        color: var(--popover-label-hover);
      }
    }
  }

  .text {
    display: flex;
    font: var(--global-font-static-comp-regular-m);
    flex-grow: 1;
    min-width: 150px;
    margin-left: var(--global-space-comp-xs);
    align-items: center;
    margin-top: -1px;
    white-space: pre;
  }

  div[data-component="portrait"] {
    color: var(--input-dropdown-label-default);
    font: var(--profile-font-initials-xs);
    min-width: var(--profile-size-outside-xs);
    height: var(--profile-size-outside-xs);
    overflow: hidden;
    border-radius: var(--global-radius-container-circle);
    border: var(--global-borderwidth-xs) solid var(--profile-border-default);
    display: inline-block;

    [data-element="initials"],
    [data-component="icon"] {
      color: var(--input-dropdown-label-default);
    }
  }
`;

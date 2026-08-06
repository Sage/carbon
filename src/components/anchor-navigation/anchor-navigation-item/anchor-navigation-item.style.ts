import styled, { css } from "styled-components";
import addFocusStyling from "../../../style/utils/add-focus-styling";

export interface StyledNavigationItemProps {
  isSelected?: boolean;
}

const StyledNavigationItem = styled.li<StyledNavigationItemProps>`
  width: 100%;

  a {
    --anchor-navigation-item-border-width: var(--global-size-6-xs);

    align-content: center;
    border-inline-start: var(--anchor-navigation-item-border-width) solid
      var(--tab-border-default);
    cursor: pointer;
    display: grid;
    grid-template-columns: var(--global-space-comp-l) minmax(0, 1fr);
    text-decoration: none;
    color: var(--tab-label-default);
    background-color: var(--tab-bg-default);
    box-sizing: border-box;
    min-height: var(--global-size-m);
    padding-block: var(--global-space-comp-s);
    padding-inline-end: var(--global-space-comp-l);
    position: relative;
    border-top-right-radius: var(--global-radius-container-m);
    border-bottom-right-radius: var(--global-radius-container-m);

    [data-element="anchor-navigation-item-indicator"] {
      align-self: stretch;
      background-color: transparent;
      grid-column: 1;
      grid-row: 1;
      justify-self: start;
      margin-inline-start: calc(
        -1 * var(--anchor-navigation-item-border-width)
      );
      width: var(--global-size-6-xs);
    }

    [data-element="anchor-navigation-item-label"] {
      color: inherit;
      font: var(--global-font-static-comp-medium-m);
      grid-column: 2;
      grid-row: 1;
      min-width: 0;
    }

    &:focus {
      ${addFocusStyling()}
      z-index: 1;
    }

    &:hover {
      ${({ isSelected }) =>
        !isSelected &&
        css`
          background-color: var(--tab-bg-hover);
          border-inline-start-color: var(--tab-border-hover);
          color: var(--tab-label-hover);
        `};
    }

    ${({ isSelected }) =>
      isSelected &&
      css`
        background-color: var(--tab-bg-active);
        border-inline-start-color: var(--tab-border-active-alt);
        color: var(--tab-label-active);

        [data-element="anchor-navigation-item-indicator"] {
          background-color: var(--tab-border-active);
          border-radius: var(--global-radius-action-m);
          width: var(--global-size-5-xs);
        }
      `}
  }
`;

export default StyledNavigationItem;

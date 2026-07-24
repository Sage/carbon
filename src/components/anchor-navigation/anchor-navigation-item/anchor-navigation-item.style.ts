import styled, { css } from "styled-components";
import addFocusStyling from "../../../style/utils/add-focus-styling";

export interface StyledNavigationItemProps {
  isSelected?: boolean;
}

const StyledNavigationItem = styled.li<StyledNavigationItemProps>`
  width: 100%;

  a {
    align-items: center;
    cursor: pointer;
    display: flex;
    gap: 10px;
    text-decoration: none;
    color: var(--tab-label-default);
    background-color: var(--tab-bg-default);
    border-left: var(--global-size-6-xs) solid var(--tab-border-active-alt);
    min-height: var(--global-size-m);
    padding: var(--global-space-comp-s) var(--global-space-comp-l);
    position: relative;
    border-top-right-radius: var(--global-radius-container-m);
    border-bottom-right-radius: var(--global-radius-container-m);

    [data-element="anchor-navigation-item-label"] {
      color: inherit;
      font: var(--global-font-static-comp-medium-m);
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
          color: var(--tab-label-hover);
        `};
    }

    ${({ isSelected }) =>
      isSelected &&
      css`
        background-color: var(--tab-bg-active);
        color: var(--tab-label-active);

        &::before {
          background-color: var(--tab-border-active);
          border-radius: var(--global-radius-action-m);
          bottom: var(--global-space-comp-s);
          content: "";
          left: calc(-1 * var(--global-size-6-xs));
          position: absolute;
          top: var(--global-space-comp-s);
          width: var(--global-size-5-xs);
        }
      `}
  }
`;

export default StyledNavigationItem;

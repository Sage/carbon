import styled from "styled-components";

const StyledNavbar = styled.div`
  &.rdp-nav {
    gap: var(--spacing100);
    height: var(--sizing500);
  }

  select {
    min-width: 0;
    appearance: none;
    border: none;
    background: transparent;
    cursor: pointer;
    font: var(--global-font-static-comp-medium-s);
    color: var(--input-dropdown-label-default);
    field-sizing: content;

    &:focus {
      outline: none;
    }
  }
`;

export const StyledSelectWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;

  select {
    padding-right: 20px;
  }

  [data-component="icon"] {
    position: absolute;
    right: 0;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    pointer-events: none;
    color: var(--input-dropdown-label-default);
  }
`;

export default StyledNavbar;

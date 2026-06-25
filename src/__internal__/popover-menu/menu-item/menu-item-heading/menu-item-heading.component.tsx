import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { PopoverMenuContext, MenuHeadingContext } from "../../contexts";
import guid from "../../../utils/helpers/guid";

const StyledMenuHeading = styled.li<{ $size: string }>`
  div[data-element="text"] {
    ${({ $size }) => {
      const fontSize = $size.charAt(0);
      return `
        padding: 0 var(--global-space-comp-m);
        font: var(--global-font-static-comp-medium-${fontSize});
        margin-left: calc(var(--global-space-comp-m) - 2px);
      `;
    }}
    color: var(--input-dropdown-label-alt);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
  }
`;

const MenuItemHeading = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  const { size } = useContext(PopoverMenuContext);
  const headingId = useRef(`popover-menu-heading-${guid()}`);

  return (
    <StyledMenuHeading
      data-component="popover-menu-item-heading"
      $size={size}
      role="option"
    >
      <div data-element="text" id={headingId.current}>
        {text}
      </div>
      <MenuHeadingContext.Provider value={{ headingId: headingId.current }}>
        <ul role="listbox" aria-label={text}>
          {children}
        </ul>
      </MenuHeadingContext.Provider>
    </StyledMenuHeading>
  );
};

MenuItemHeading.displayName = "PopoverMenuItemHeading";

export default MenuItemHeading;

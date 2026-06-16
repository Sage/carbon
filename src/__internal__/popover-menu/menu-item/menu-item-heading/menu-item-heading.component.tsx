import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { PopoverMenuContext } from "../../contexts";
import guid from "../../../utils/helpers/guid";

const StyledMenuHeading = styled.li<{ $size: string }>`
  span[data-element="text"] {
    ${({ $size }) => {
      const fontSize = $size.charAt(0);
      return `
        padding: var(--global-space-comp-m) var(--global-space-comp-m) var(--global-space-comp-xl);
        font: var(--global-font-static-comp-medium-${fontSize});
        margin-left: calc(var(--global-space-comp-m) - 2px);
      `;
    }}
    color: var(--input-dropdown-label-alt);
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
    >
      <div data-element="text" id={headingId.current}>
        {text}
      </div>
      <ul role="list">{children}</ul>
    </StyledMenuHeading>
  );
};

MenuItemHeading.displayName = "PopoverMenuItemHeading";

export default MenuItemHeading;

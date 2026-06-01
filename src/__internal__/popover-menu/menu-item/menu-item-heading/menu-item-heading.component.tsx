import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { PopoverMenuContext } from "../../contexts";
import guid from "../../../utils/helpers/guid";

const StyledMenuHeading = styled.div<{ $size: string }>`
  span[data-element="text"] {
    ${({ $size }) => {
      const paddingSize = $size === "small" ? "m" : "xl";
      const fontSize = $size.charAt(0);
      return `
        padding: var(--global-space-comp-m) var(--global-space-comp-${paddingSize}) 0;
        font: var(--global-font-static-comp-medium-${fontSize});
      `;
    }}
    color: var(--input-dropdown-label-alt);
  }

  div[data-element="sublist"] {
    margin: 0;
    padding: 0;
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
      role="group"
    >
      <span data-element="text" id={headingId.current}>
        {text}
      </span>
      <div data-element="sublist">{children}</div>
    </StyledMenuHeading>
  );
};

MenuItemHeading.displayName = "PopoverMenuItemHeading";

export default MenuItemHeading;

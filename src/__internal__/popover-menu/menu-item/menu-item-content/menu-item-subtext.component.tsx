import React, { useContext } from "react";
import styled, { css } from "styled-components";
import {
  PopoverMenuContext,
  type PopoverMenuContextProps,
} from "../../contexts";

interface StyledMenuItemSubtextProps {
  $size: PopoverMenuContextProps["size"];
}

const StyledMenuItemSubtext = styled.span<StyledMenuItemSubtextProps>`
  grid-column: -2 / -1;
  grid-row: 2;
  color: var(--input-dropdown-label-subtxt);

  ${({ $size }) => css`
    ${($size === "small" || $size === "medium") &&
    `
      font: var(--global-font-static-comp-regular-xs);
    `}

    ${$size === "large" &&
    `
      font: var(--global-font-static-comp-regular-s);
    `}
  `}
`;

const MenuItemSubtext = ({ children }: { children: React.ReactNode }) => {
  const { size } = useContext(PopoverMenuContext);

  return (
    <StyledMenuItemSubtext
      data-element="menu-item-subtext"
      className="menu-item-subtext"
      $size={size}
    >
      {children}
    </StyledMenuItemSubtext>
  );
};

MenuItemSubtext.displayName = "PopoverMenuItemSubtext";

export default MenuItemSubtext;

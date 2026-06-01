import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { PopoverMenuContext } from "../../contexts";

interface StyledMenuItemSubtextProps {
  $size: string;
}

const StyledMenuItemSubtext = styled.span<StyledMenuItemSubtextProps>`
  grid-column: -2 / -1;
  grid-row: 2;
  color: var(--input-dropdown-label-subtxt);

  ${({ $size }) => css`
    ${$size === "small" &&
    `
      font: var(--global-font-static-comp-regular-xs);
    `}

    ${$size === "medium" &&
    `
      font: var(--global-font-static-comp-regular-s);
    `}
    
    ${$size === "large" &&
    `
      font: var(--global-font-static-comp-regular-m);
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

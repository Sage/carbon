import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { PopoverMenuContext } from "../../contexts";

interface StyledMenuItemLabelProps {
  $size: string;
}

const StyledMenuItemLabel = styled.span<StyledMenuItemLabelProps>`
  grid-column: -2 / -1;
  grid-row: 1;

  ${({ $size }) => css`
    span.menu-item-label-prefix {
      ${$size === "small" &&
      `
        font: var(--global-font-static-comp-medium-s);
      `}

      ${$size === "medium" &&
      `
        font: var(--global-font-static-comp-medium-m);
      `}
      
      ${$size === "large" &&
      `
        font: var(--global-font-static-comp-medium-l);
      `}
    }
  `}
`;

export interface MenuItemLabelProps {
  children: React.ReactNode;
  prefix?: string;
}

const MenuItemLabel = ({ children, prefix }: MenuItemLabelProps) => {
  const { size } = useContext(PopoverMenuContext);
  return (
    <StyledMenuItemLabel data-element="menu-item-label" $size={size}>
      {prefix && (
        <span
          data-element="menu-item-label-prefix"
          className="menu-item-label-prefix"
        >
          {prefix}
        </span>
      )}
      {children}
    </StyledMenuItemLabel>
  );
};

MenuItemLabel.displayName = "PopoverMenuItemLabel";

export default MenuItemLabel;

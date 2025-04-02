import React, { useRef } from "react";

import {
  StyledPrimaryMenu,
  StyledPrimaryMenuAction,
  StyledPrimaryMenuItem,
} from "./primary-menu.style";
import MenuItemContent from "../menu-item/menu-item";
import { SecondaryMenuProps } from "../secondary-menu/secondary-menu";
import { useVerticalMenu } from "../../vertical-menu-with-button.context";
import Box from "../../../../box";
import Icon, { IconType } from "../../../../icon";

export interface PrimaryMenuProps extends SecondaryMenuProps {
  children?: React.ReactNode;
}

export interface PrimaryMenuItemProps {
  children?: React.ReactNode;
  customIcon?: () => React.JSX.Element;
  href?: string;
  icon?: IconType;
  id: string;
  label?: string;
}

export const PrimaryMenuItem = ({
  children,
  customIcon,
  href,
  icon,
  id,
  label,
}: PrimaryMenuItemProps) => {
  const { activeMenuItem, setActiveMenuItem } = useVerticalMenu();
  const isActive = activeMenuItem?.id === id;
  const containerRef = useRef<HTMLDivElement>(null);

  if (children) {
    return (
      <Box width="100%">
        <StyledPrimaryMenuItem
          active={isActive}
          aria-expanded={isActive}
          id={id}
          onClick={() => {
            setActiveMenuItem(isActive ? null : { id, children });
          }}
          onKeyDown={(e) => {
            if (e.key === "Tab" && isActive && !e.shiftKey) {
              e.preventDefault();
              if (containerRef.current) {
                const subMenu = containerRef.current.querySelector(
                  '[id="global-nav-v2-submenu"]',
                );
                if (subMenu) {
                  const firstChild = subMenu.firstChild as HTMLElement;
                  firstChild.focus();
                }
              }
            }
          }}
          tabIndex={0}
          type="button"
        >
          <MenuItemContent customIcon={customIcon} icon={icon} label={label} />
          <Icon type="chevron_right_thick" />
        </StyledPrimaryMenuItem>

        {isActive && <div ref={containerRef}>{children}</div>}
      </Box>
    );
  }

  return (
    <StyledPrimaryMenuAction href={href} id={id} tabIndex={0}>
      <MenuItemContent customIcon={customIcon} icon={icon} label={label} />
    </StyledPrimaryMenuAction>
  );
};

export const PrimaryMenu = ({
  children,
  height = "100%",
  reduceMotion,
}: PrimaryMenuProps) => {
  const { menuRef } = useVerticalMenu();

  return (
    <StyledPrimaryMenu
      data-component="global-nav-v2-menu"
      height={height}
      reduceMotion={reduceMotion}
      ref={menuRef}
    >
      {children}
    </StyledPrimaryMenu>
  );
};

export default PrimaryMenu;

import React, { useLayoutEffect, useRef, useState } from "react";

import Icon, { IconType } from "../../../../icon";

import { useV2Menu } from "../../global-vertical-menu.context";
import {
  StyledSecondaryMenuDropdown,
  StyledSecondaryMenu,
  StyledSecondaryMenuAction,
} from "./secondary-menu.style";
import MenuItemContent from "../menu-item/menu-item";
import Box from "../../../../box";

export interface SecondaryMenuProps {
  children?: React.ReactNode;
  height?: string;
  reduceMotion?: boolean;
}

export interface SecondaryMenuItemProps {
  children?: React.ReactNode;
  customIcon?: () => React.JSX.Element;
  href?: string;
  icon?: IconType;
  id: string;
  label?: string;
}

export const SecondaryMenuItem = React.forwardRef<
  HTMLDivElement,
  SecondaryMenuItemProps
>(
  (
    { children, customIcon, href, icon, id, label }: SecondaryMenuItemProps,
    ref,
  ) => {
    const [expanded, setExpanded] = useState(false);
    const itemRef = useRef<HTMLButtonElement>(null);

    if (children) {
      return (
        <Box ref={ref} width="100%">
          <StyledSecondaryMenuDropdown
            aria-expanded={expanded}
            id={id}
            onClick={() => setExpanded(!expanded)}
            ref={itemRef}
            type="button"
          >
            <MenuItemContent
              customIcon={customIcon}
              icon={icon}
              label={label}
            />
            <Icon type={expanded ? "chevron_up_thick" : "chevron_down_thick"} />
          </StyledSecondaryMenuDropdown>
          {expanded && children}
        </Box>
      );
    }

    return (
      <StyledSecondaryMenuAction href={href} id={id} tabIndex={0}>
        <MenuItemContent customIcon={customIcon} icon={icon} label={label} />
      </StyledSecondaryMenuAction>
    );
  },
);

export const SecondaryMenu = ({
  children,
  height = "100%",
  reduceMotion,
}: SecondaryMenuProps) => {
  const { activeMenuItem, buttonRef, menuRef } = useV2Menu();

  const [left, setLeft] = useState("auto");
  const [top, setTop] = useState("auto");
  const subMenuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (activeMenuItem && menuRef && menuRef.current) {
      setLeft(`${menuRef.current.getBoundingClientRect().right}px`);
    } else {
      setLeft("auto");
    }

    if (activeMenuItem && buttonRef && buttonRef.current) {
      setTop(`${buttonRef.current.getBoundingClientRect().bottom}px`);
    } else {
      setTop("auto");
    }
  }, [activeMenuItem, buttonRef, menuRef]);

  return (
    <StyledSecondaryMenu
      data-component="global-nav-v2-submenu"
      height={height || undefined}
      id="global-nav-v2-submenu"
      left={left}
      reduceMotion={reduceMotion}
      onKeyDown={(event) => {
        // if (!activeMenuItem.children) return;
        // const lastItem =
        //   activeMenuItem.children[activeMenuItem.children.length - 1];
        // const firstItem = activeMenuItem.children[0];
        // const activeItem = activeMenuItem.children.find(
        //   (item) => item.id === document.activeElement?.id,
        // );
        // const parentElement = document.querySelector(
        //   `#${activeMenuItem?.id}`,
        // ) as HTMLDivElement;
        // if (event.key === "Tab") {
        //   if (activeItem === lastItem && !event.shiftKey) {
        //     parentElement?.focus();
        //   }
        //   if (event.shiftKey && activeItem === firstItem) {
        //     event.preventDefault();
        //     parentElement?.focus();
        //   }
        // }
      }}
      ref={subMenuRef}
      top={top}
    >
      {children}
    </StyledSecondaryMenu>
  );
};

export default SecondaryMenu;

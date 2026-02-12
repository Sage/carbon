import React, { useRef } from "react";
import styled, { css } from "styled-components";
import PopoverMenu, { List } from "./popover-menu.component";
import Icon from "../../components/icon";
import { flip, offset } from "@floating-ui/react";
import useMenuItem from "./useMenuItem";

export const ListItem = styled.li`
  color: var(--popover-label-default);
  width: 100%;
  position: relative;

  :not(.submenu_open):has(> button:active) {
    color: var(--popover-label-active);
  }

  :has(> button:hover) {
    color: var(--popover-label-hover);
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  right: var(--global-space-comp-s);
  top: var(--global-space-comp-s);
  cursor: pointer;
  z-index: 1;

  /* [data-component="pop"] & { */
  /* color: currentColor; */
  /* } */
`;

const AccordionContent = styled(List)<{ $isOpen: boolean }>`
  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      display: none;
    `}
`;

const submenuPopoverMiddleware = [
  offset(-2),
  flip({
    fallbackStrategy: "initialPlacement",
  }),
];

export default ({
  children,
  submenu,
  smallScreen,
}: {
  children: React.ReactNode;
  submenu?: React.ReactNode;
  smallScreen?: boolean;
}) => {
  const ref = useRef<HTMLLIElement | null>(null);
  const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(false);

  if (submenu) {
    const wrappedSubmenuChildren = useMenuItem(submenu);
    const classNames = [isSubmenuOpen ? "submenu_open" : ""].join(" ");

    if (smallScreen) {
      // move this to popover as cyclical atm
      return (
        <ListItem
          ref={ref}
          data-component="popover-menu-item"
          onClick={() => setIsSubmenuOpen((p) => !p)}
          className={classNames}
        >
          {children}
          <IconWrapper>
            <Icon type="caret_down" fontSize="small" />
          </IconWrapper>
          <AccordionContent
            $isOpen={isSubmenuOpen}
            data-component="popover-menu-accordion-submenu"
          >
            {wrappedSubmenuChildren}
          </AccordionContent>
        </ListItem>
      );
    }

    return (
      <ListItem
        ref={ref}
        onClick={() => setIsSubmenuOpen((p) => !p)}
        data-component="popover-menu-item"
        className={classNames}
      >
        {children}
        <IconWrapper>
          <Icon type="caret_right" fontSize="small" />
        </IconWrapper>
        <PopoverMenu
          submenuControlRef={ref}
          placement="right-start"
          middleware={submenuPopoverMiddleware}
          open={isSubmenuOpen}
        >
          {submenu}
        </PopoverMenu>
      </ListItem>
    );
  }

  return <ListItem data-component="popover-menu-item">{children}</ListItem>;
};

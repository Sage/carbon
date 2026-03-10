import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Popover from "../popover";
import { flip, offset } from "@floating-ui/react";
import useMenuItem from "./wrap-children-in-item.util";
import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";

const PopoverControlWrapper = styled.div`
  display: inline-block;
`;

interface WrapperProps {
  $isSubmenu: boolean;
}

interface ListProps {
  $size?: "small" | "medium" | "large";
}

/*

fill: "container.scrollbar.fg-default";
borderRadiusTopLeft: "global.radius.container.circle";
borderRadiusTopRight: "global.radius.container.circle";
borderRadiusBottomRight: "global.radius.container.circle";
borderRadiusBottomLeft: "global.radius.container.circle";

borderRadius: "global.radius.action.circle";
width: 6px;
padding 1px;
*/

export const List = styled.ul<ListProps>`
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: var(--popover-bg-default);
  overflow: hidden auto;

  &::-webkit-scrollbar {
    width: 6px;
    padding: 1px;
  }
  &::-webkit-scrollbar-track {
    background-color: var(--container-scrollbar-bg-default);
    border-radius: var(--global-radius-action-circle);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--container-scrollbar-fg-default);
    border-radius: var(--global-radius-action-circle);
  }

  ${({ $size }) => css`
    ${$size === "small" &&
    css`
      max-height: 370px;
    `}

    ${$size === "medium" &&
    css`
      max-height: 470px;
    `}

    ${$size === "large" &&
    css`
      max-height: 550px;
    `}
  `}
`;

const Wrapper = styled.div<WrapperProps>`
  padding: var(--global-space-comp-s) var(--global-space-none);
  max-height: 100%;
  border-radius: var(--global-radius-container-m);
  box-shadow: var(--global-depth-lvl1);
  background-color: var(--popover-bg-default);
  width: 214px;

  ${({ $isSubmenu }) =>
    $isSubmenu &&
    css`
      z-index: 1;
    `}
`;

export interface PopoverMenuProps {
  /** The content of the popover menu */
  children: React.ReactNode;
  /** Whether the popover menu is open or not */
  open: boolean;
  /** The element that the popover menu is anchored to */
  popoverControl?: React.ReactNode;

  size?: "small" | "medium" | "large";
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end";
  middleware?: typeof menuPopoverMiddleware;
  submenuControlRef?: React.RefObject<HTMLElement>;
  /** Ref forwarded to the inner List (ul) element */
  listRef?: React.RefObject<HTMLUListElement>;
  /** id applied to the outer wrapper element (e.g. for aria-controls) */
  id?: string;
  /** Keydown handler for the outer wrapper element */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /** Blur handler for the outer wrapper element */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;

  onOpen?: () => void;
  onClose?: (e?: Event) => void;
  smallScreen?: boolean;
}

const menuPopoverMiddleware = [
  offset(8),
  flip({
    fallbackStrategy: "initialPlacement",
  }),
];

const PopoverMenuContext = React.createContext<{
  open: boolean;
}>({
  open: false,
});
export const usePopoverMenuContext = () => React.useContext(PopoverMenuContext);

export default ({
  children,
  open,
  popoverControl,
  size = "medium",
  placement = "bottom-end",
  middleware = menuPopoverMiddleware,
  submenuControlRef,
  listRef,
  onOpen,
  onClose,
  // smallScreen = false,
  ...rest
}: PopoverMenuProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const wrappedChildren = useMenuItem(children);
  const isSubmenu = !!submenuControlRef;
  // const { open: parentMenuOpen } = usePopoverMenuContext();

  useEffect(() => {
    if (!open) {
      onClose?.();
      return;
    }
    onOpen?.();
  }, [open, onClose, onOpen]);

  const handleClickInside = useClickAwayListener(onClose || (() => {}));

  // const isOpen = isSubmenu  : open;

  return (
    <div onClick={handleClickInside} {...rest}>
      {popoverControl && (
        <PopoverControlWrapper ref={ref}>
          {popoverControl}
        </PopoverControlWrapper>
      )}
      {open && (
        <Popover
          placement={placement}
          reference={submenuControlRef ?? ref}
          isOpen={open}
          data-component="popover-menu"
          middleware={middleware}
          disablePortal
          popoverStrategy="fixed"
        >
          <Wrapper
            ref={scrollRef}
            data-component="scroll-wrapper"
            $isSubmenu={isSubmenu}
          >
            <List $size={size} ref={listRef}>
              {wrappedChildren}
            </List>
          </Wrapper>
        </Popover>
      )}
    </div>
  );
};

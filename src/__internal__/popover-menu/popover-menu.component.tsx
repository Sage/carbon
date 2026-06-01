import React, { useCallback, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Popover from "../popover";
import { flip, offset, size } from "@floating-ui/react";
import wrapChildrenInMenuItems from "./utils";
import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import { ButtonHandle } from "../../components/button/__next__";
import { useHandleDropdownMenuKeyDown } from "./hooks";
import guid from "../utils/helpers/guid";
import { PopoverMenuContext } from "./contexts";
import { TagProps } from "../utils/helpers/tags";

const PopoverControlWrapper = styled.div`
  display: inline-block;
`;

interface ListProps {
  $size?: "small" | "medium" | "large";
}

export const List = styled.div<ListProps>`
  margin: 0;
  padding: 0;
  background-color: var(--popover-bg-default);
  overflow: hidden auto;
  display: flex;
  flex-direction: column;

  ${({ $size }) => css`
    ${$size === "small" &&
    css`
      max-height: calc(5 * var(--global-size-s));
    `}

    ${$size === "medium" &&
    css`
      max-height: calc(5 * var(--global-size-m));
    `}

    ${$size === "large" &&
    css`
      max-height: calc(5 * var(--global-size-l));
    `}
  `}
`;

const MenuWrapper = styled.div`
  padding: var(--global-space-comp-s) var(--global-space-none);
  box-shadow: var(--global-depth-lvl1);
  border-radius: var(--global-radius-container-m);
  background-color: var(--popover-bg-default);
  width: max-content;
  max-width: 100%;
  max-height: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const ScrollWrapper = styled.div`
  max-height: 100%;
  width: 100%;
`;

interface PopooverControlProps {
  // onBlur: (ev: React.FocusEvent<HTMLElement>) => void;
  "aria-haspopup": "listbox" | "menu";
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  role?: string;
}

type FocusableHandle =
  | NonNullable<ButtonHandle>
  | HTMLElement
  | HTMLButtonElement
  | HTMLAnchorElement
  | HTMLInputElement;

function isFocusButtonHandle(
  handle: FocusableHandle,
): handle is NonNullable<ButtonHandle> {
  return "focusButton" in handle;
}

export interface PopoverMenuProps<
  TRef extends FocusableHandle = NonNullable<ButtonHandle>,
> extends TagProps {
  /** The content of the popover menu */
  children: React.ReactNode;
  /** Whether the popover menu is open or not */
  open: boolean;
  /** The element that the popover menu is anchored to */
  popoverControl?: (
    ref: React.RefObject<TRef>,
    props: PopooverControlProps,
  ) => React.ReactNode;
  size?: "small" | "medium" | "large";
  /** Placement of the popover menu */
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
  /** Middleware for the popover menu */
  middleware?: typeof menuPopoverMiddleware;
  submenuControlRef?: React.RefObject<HTMLElement>;
  /** Ref forwarded to the inner List (div) element */
  listRef?: React.RefObject<HTMLDivElement>;
  /** id applied to the outer wrapper element (e.g. for aria-controls) */
  id?: string;
  /** Blur handler for the outer wrapper element */
  onBlur?: React.FocusEventHandler<HTMLElement>;
  /** Callback when the popover menu is opened */
  onOpen: () => void;
  /** Callback when the popover menu is closed */
  onClose: (e?: Event, value?: string) => void;
  /** Set the custom width of the menu */
  width?: string;
  /** Aria label for the listbox */
  listboxAriaLabel?: string;
  /** Aria labelledby for the listbox */
  listboxAriaLabelledBy?: string;
}

const menuPopoverMiddleware = (width?: string) => [
  offset(8),
  flip({
    fallbackStrategy: "initialPlacement",
  }),
  size({
    apply({ rects, elements }) {
      elements.floating.style.width = width || `${rects.reference.width}px`;
    },
  }),
];

const focusControl = (handle: FocusableHandle | null) => {
  /* istanbul ignore if */
  if (!handle) {
    return;
  }

  if (isFocusButtonHandle(handle)) {
    handle.focusButton();
  } else {
    handle.focus();
  }
};

const PopoverMenu = <TRef extends FocusableHandle = NonNullable<ButtonHandle>>({
  children,
  open,
  popoverControl,
  size = "medium",
  placement = "bottom-end",
  middleware,
  listRef,
  onOpen,
  onClose,
  width,
  listboxAriaLabel,
  listboxAriaLabelledBy,
  ...rest
}: PopoverMenuProps<TRef>) => {
  const controlWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const listId = useRef(`popover-menu-scroll-wrapper-${guid()}`);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const wrappedChildren = wrapChildrenInMenuItems(children);
  const controlRef = useRef<TRef>(null);
  const handleClickInside = useClickAwayListener(onClose);
  const computedMiddleware = menuPopoverMiddleware(width);

  const handleMainWrapperKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (open && ev.key === "Escape") {
        ev.preventDefault();
        onClose();
        focusControl(controlRef.current);
      }
    },
    [open, onClose],
  );

  useEffect(() => {
    const { current: wrapperEl } = wrapperRef;

    wrapperEl?.addEventListener("click", handleClickInside, { passive: true });
    wrapperEl?.addEventListener("keydown", handleMainWrapperKeyDown);

    return () => {
      wrapperEl?.removeEventListener("click", handleClickInside);
      wrapperEl?.removeEventListener("keydown", handleMainWrapperKeyDown);
    };
  }, [handleClickInside, handleMainWrapperKeyDown]);

  const handleDropdownMenuKeyDown = useHandleDropdownMenuKeyDown(
    scrollRef,
    onClose,
    () => focusControl(controlRef.current),
  );

  const handleControlKeyDown: React.KeyboardEventHandler<HTMLElement> =
    useCallback(
      (ev) => {
        if (
          open &&
          controlWrapperRef.current?.contains(document.activeElement) &&
          (ev.key === "ArrowDown" || ev.key === "ArrowUp")
        ) {
          ev.preventDefault();
          handleDropdownMenuKeyDown(ev);

          return;
        }
      },
      [open, handleDropdownMenuKeyDown],
    );

  return (
    <div ref={wrapperRef} data-component="popover-menu" {...rest}>
      {popoverControl && (
        <PopoverControlWrapper
          ref={controlWrapperRef}
          onKeyDown={handleControlKeyDown}
          data-component="popover-menu-control"
        >
          {popoverControl(controlRef, {
            "aria-haspopup": "listbox",
            // this will cause axe to flag as incomplete, that means it needs manually checking
            "aria-controls": open ? listId.current : undefined,
            "aria-expanded": open,
            role: "combobox",
          })}
        </PopoverControlWrapper>
      )}
      <PopoverMenuContext.Provider value={{ size }}>
        {open && (
          <Popover
            placement={placement}
            reference={controlWrapperRef}
            isOpen={open}
            data-component="popover-menu"
            middleware={computedMiddleware}
            disablePortal
            popoverStrategy="fixed"
          >
            <MenuWrapper
              onKeyDown={open && handleDropdownMenuKeyDown}
              data-role="menu-wrapper"
              onMouseDown={(e) => e.preventDefault()}
            >
              <ScrollWrapper ref={scrollRef} data-component="scroll-wrapper">
                <List
                  $size={size}
                  ref={listRef}
                  role="listbox"
                  id={listId.current}
                  aria-label={listboxAriaLabel}
                  aria-labelledby={listboxAriaLabelledBy}
                >
                  {wrappedChildren}
                </List>
              </ScrollWrapper>
            </MenuWrapper>
          </Popover>
        )}
      </PopoverMenuContext.Provider>
    </div>
  );
};

export default PopoverMenu;

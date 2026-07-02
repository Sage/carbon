import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css, CSSObject } from "styled-components";
import Popover from "../popover";
import { flip, offset, size } from "@floating-ui/dom";
import wrapChildrenInMenuItems from "./utils";
import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import { ButtonHandle } from "../../components/button/__next__";
import { useHandleDropdownMenuKeyDown } from "./hooks";
import guid from "../utils/helpers/guid";
import { PopoverMenuContext, type PopoverMenuContextProps } from "./contexts";
import { TagProps } from "../utils/helpers/tags";

const PopoverControlWrapper = styled.div<{
  $controlWrapperStyle?: CSSObject;
}>`
  display: inline-block;
  ${({ $controlWrapperStyle }) => $controlWrapperStyle}
`;

interface ListProps {
  $size: PopoverMenuContextProps["size"];
}

export const List = styled.ul<ListProps>`
  margin: var(--global-space-none);
  padding: var(--global-space-none);
  background-color: var(--popover-bg-default);
  overflow: hidden auto;
  display: flex;
  flex-direction: column;

  ${({ $size }) => css`
    max-height: calc(5 * var(--global-size-${$size.charAt(0)}));
  `}
  list-style: none;
`;

const paddingSize = {
  small: "var(--global-space-comp-xs)",
  medium: "var(--global-space-comp-s)",
  large: "var(--global-space-comp-m)",
};

const MenuWrapper = styled.div<{ $size: PopoverMenuContextProps["size"] }>`
  padding: ${({ $size }) => css`
    ${paddingSize[$size]} var(--global-space-none)
  `};
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

interface PopoverControlProps {
  "aria-haspopup": "listbox" | "menu";
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  role?: string;
  "aria-activedescendant"?: string;
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
    ref: React.MutableRefObject<TRef | null>,
    props: PopoverControlProps,
  ) => React.ReactNode;
  size?: PopoverMenuContextProps["size"];
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
  /** Ref for the submenu control element */
  submenuControlRef?: React.MutableRefObject<HTMLElement | null>;
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
  /** Custom styles for the control wrapper element */
  controlWrapperStyle?: CSSObject;
  /** Aria labelledby for the listbox */
  listboxAriaLabelledBy?: string;
}

const OFFSET = 8;

const menuPopoverMiddleware = (width?: string) => [
  offset(OFFSET),
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
  onOpen,
  onClose,
  width,
  controlWrapperStyle,
  listboxAriaLabelledBy,
  ...rest
}: PopoverMenuProps<TRef>) => {
  const controlWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const listId = useRef(`popover-menu-scroll-wrapper-${guid()}`);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const wrappedChildren = wrapChildrenInMenuItems(children);
  const controlRef = useRef<TRef>(null);
  const handleClickInside = useClickAwayListener(onClose);
  const computedMiddleware = menuPopoverMiddleware(width);
  const [ariaActivedescendant, setAriaActivedescendant] = useState<string>("");

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
    listRef,
    setAriaActivedescendant,
  );

  const handleControlKeyDown: React.KeyboardEventHandler<HTMLElement> =
    useCallback(
      (ev) => {
        if (
          open &&
          controlWrapperRef.current?.contains(document.activeElement)
        ) {
          handleDropdownMenuKeyDown(ev);

          return;
        }
      },
      [open, handleDropdownMenuKeyDown],
    );

  useEffect(() => {
    if (!open) {
      setAriaActivedescendant("");
    }
  }, [open]);

  return (
    <div ref={wrapperRef} data-component="popover-menu" {...rest}>
      {popoverControl && (
        <PopoverControlWrapper
          ref={controlWrapperRef}
          onKeyDown={handleControlKeyDown}
          data-component="popover-menu-control"
          $controlWrapperStyle={controlWrapperStyle}
        >
          {popoverControl(controlRef, {
            "aria-haspopup": "listbox",
            "aria-controls": listId.current,
            "aria-expanded": open,
            role: "combobox",
            "aria-activedescendant":
              open && ariaActivedescendant ? ariaActivedescendant : undefined,
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
              $size={size}
              data-role="menu-wrapper"
              onMouseDown={(e) => e.preventDefault()}
              ref={scrollRef}
            >
              <List
                $size={size}
                ref={listRef}
                role="listbox"
                id={listId.current}
                aria-labelledby={listboxAriaLabelledBy}
              >
                {wrappedChildren}
              </List>
            </MenuWrapper>
          </Popover>
        )}
      </PopoverMenuContext.Provider>
    </div>
  );
};

export default PopoverMenu;

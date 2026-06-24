import React, {
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import Popover, { PopoverProps } from "../popover";
import { flip, offset, size } from "@floating-ui/dom";
import wrapChildrenInMenuItems from "./utils";
import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import { ButtonHandle } from "../../components/button/__next__";
import { useHandleDropdownMenuKeyDown, setFocus } from "./hooks";
import guid from "../utils/helpers/guid";
import {
  PopoverMenuContext,
  PopoverMenuContextProps,
  PopoverControlProps,
  SubmenuRenderProps,
} from "./contexts";
import { TagProps } from "../utils/helpers/tags";
import combineRefs from "../utils/helpers/combine-refs";

const PopoverControlWrapper = styled.div`
  display: inline-block;
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

const ScrollWrapper = styled.div`
  max-height: 100%;
  width: 100%;
`;

export type FocusableHandle =
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
  popoverControl: (
    ref: React.RefObject<TRef>,
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
  submenuControlRef?: React.RefObject<HTMLElement>;
  /** id applied to the outer wrapper element (e.g. for aria-controls) */
  id?: string;
  /** Blur handler for the outer wrapper element */
  onBlur?: React.FocusEventHandler<HTMLElement>;
  /** Callback when the popover menu is opened */
  onOpen: () => void;
  /** Callback when the popover menu is closed */
  onClose: (e?: Event) => void;
  /** Set the custom width of the menu */
  width?: string;
  /** Aria labelledby for the listbox */
  listboxAriaLabelledBy?: string;

  isButtonMenu?: boolean;

  isSubmenu?: boolean;

  focusSubmenuParent?: () => void;

  /** Internal: override the Popover reference element (used for submenu positioning) */
  controlReference?: React.RefObject<HTMLLIElement>;

  listRef?: React.Ref<HTMLUListElement>;

  focusItemOnOpen?: boolean;
}

const OFFSET = 8;
const SUBMENU_OFFSET = 0;

const menuPopoverMiddleware = (
  width?: string,
  isButtonMenu?: boolean,
  isSubmenu?: boolean,
) => [
  offset(isSubmenu ? SUBMENU_OFFSET : OFFSET),
  flip({
    fallbackStrategy: "initialPlacement",
  }),
  size({
    apply({ rects, elements }) {
      if (isButtonMenu) return;
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

interface MenuProps {
  open: boolean;
  placement: PopoverMenuProps["placement"];
  controlWrapperRef: React.RefObject<HTMLDivElement | HTMLLIElement>;
  size: "small" | "medium" | "large";
  listRef: React.Ref<HTMLUListElement>;
  listboxAriaLabelledBy?: string;
  isButtonMenu?: boolean;
  children: React.ReactNode;
  onKeyDown: (ev: React.KeyboardEvent<HTMLElement>) => void;
  middleware: PopoverProps["middleware"];
  scrollRef: React.RefObject<HTMLDivElement>;
  listId: string;
  disablePortal?: boolean;
}

const Menu = ({
  open,
  placement,
  controlWrapperRef,
  size,
  listRef,
  listboxAriaLabelledBy,
  isButtonMenu,
  children,
  onKeyDown,
  middleware,
  scrollRef,
  listId,
  disablePortal,
}: MenuProps) => {
  return (
    <Popover
      placement={placement}
      reference={controlWrapperRef}
      isOpen={open}
      data-component="popover-menu"
      middleware={middleware}
      disablePortal={disablePortal}
      popoverStrategy="fixed"
    >
      <MenuWrapper
        $size={size}
        onKeyDown={onKeyDown}
        data-role="menu-wrapper"
        onMouseDown={(e) => e.preventDefault()}
      >
        <ScrollWrapper ref={scrollRef} data-component="scroll-wrapper">
          <List
            $size={size}
            ref={listRef}
            role={isButtonMenu ? "menu" : "listbox"}
            id={listId}
            aria-labelledby={listboxAriaLabelledBy}
          >
            {children}
          </List>
        </ScrollWrapper>
      </MenuWrapper>
    </Popover>
  );
};

interface ControlProps<
  TRef extends FocusableHandle = NonNullable<ButtonHandle>,
> {
  open: boolean;
  isButtonMenu?: boolean;
  isSubmenu?: boolean;
  popoverControl: PopoverMenuProps<TRef>["popoverControl"];
  controlRef: React.RefObject<TRef>;
  controlWrapperRef: React.RefObject<HTMLDivElement>;
  onKeyDown: (ev: React.KeyboardEvent<HTMLElement>) => void;
  listId: string;
  "aria-activedescendant"?: string;
}

const Control = <TRef extends FocusableHandle = NonNullable<ButtonHandle>>({
  open,
  isButtonMenu,
  isSubmenu,
  popoverControl,
  controlRef,
  controlWrapperRef,
  onKeyDown,
  listId,
  "aria-activedescendant": ariaActivedescendant,
}: ControlProps<TRef>) => {
  return isSubmenu ? (
    popoverControl(controlRef, {
      "aria-haspopup": "menu",
      // this will cause axe to flag as incomplete, that means it needs manually checking
      "aria-controls": open ? listId : undefined,
      "aria-expanded": open,
      "aria-activedescendant": ariaActivedescendant,
      role: "menuitem",
    })
  ) : (
    <PopoverControlWrapper
      ref={controlWrapperRef}
      onKeyDown={onKeyDown}
      data-component="popover-menu-control"
    >
      {popoverControl(controlRef, {
        "aria-haspopup": isButtonMenu ? "menu" : "listbox",
        // this will cause axe to flag as incomplete, that means it needs manually checking
        "aria-controls": open ? listId : undefined,
        "aria-expanded": open,
        "aria-activedescendant": ariaActivedescendant,
        role: isButtonMenu ? undefined : "combobox",
      })}
    </PopoverControlWrapper>
  );
};

const PopoverMenuInner = <
  TRef extends FocusableHandle = NonNullable<ButtonHandle>,
>(
  {
    children,
    open,
    popoverControl,
    size = "medium",
    placement = "bottom-end",
    onOpen,
    onClose,
    width,
    listboxAriaLabelledBy,
    isButtonMenu = false,
    isSubmenu = false,
    focusSubmenuParent,
    id,
    controlReference,
    listRef,
    focusItemOnOpen = false,
    ...rest
  }: PopoverMenuProps<TRef>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const controlWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const internalListRef = useRef<HTMLUListElement | null>(null);
  const combinedListRef = combineRefs(listRef, internalListRef);
  const listId = useRef(id ?? `popover-menu-wrapper-${guid()}`);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const combinedWrapperRef = combineRefs(wrapperRef, ref);
  const wrappedChildren = wrapChildrenInMenuItems(children);
  const controlRef = useRef<TRef>(null);
  const handleClickInside = useClickAwayListener(onClose);
  const [ariaActivedescendant, setAriaActivedescendant] = useState<string>("");
  const computedMiddleware = menuPopoverMiddleware(
    width,
    isButtonMenu,
    isSubmenu,
  );
  const direction = useRef<"up" | "down" | null>(null);
  const popoverReference: React.RefObject<HTMLDivElement | HTMLLIElement> =
    controlReference ?? controlWrapperRef;

  const handleMainWrapperKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (open && ev.key === "Escape") {
        ev.preventDefault();
        ev.stopPropagation();
        onClose();
        if (isSubmenu) {
          focusSubmenuParent?.();
        } else {
          focusControl(controlRef.current);
        }
      }
    },
    [open, onClose, isSubmenu, focusSubmenuParent],
  );

  useEffect(() => {
    const el = isSubmenu ? scrollRef.current : wrapperRef.current;

    el?.addEventListener("click", handleClickInside, { passive: true });
    el?.addEventListener("keydown", handleMainWrapperKeyDown);

    // When mounted as a submenu, also mark clicks on the trigger <li> as "inside"
  // so the click-away listener doesn't fire when the trigger button is clicked
  const triggerEl = isSubmenu ? controlReference?.current : null;
  triggerEl?.addEventListener("click", handleClickInside, { passive: true });

  return () => {
    el?.removeEventListener("click", handleClickInside);
    el?.removeEventListener("keydown", handleMainWrapperKeyDown);
    triggerEl?.removeEventListener("click", handleClickInside);
  };
  }, [isSubmenu, handleClickInside, handleMainWrapperKeyDown, controlReference]);

  const handleDropdownMenuKeyDown = useHandleDropdownMenuKeyDown(
    internalListRef,
    setAriaActivedescendant,
    onClose,
    { isButtonMenu, isSubmenu, focusSubmenuParent },
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
        } else if (!open && isButtonMenu && !isSubmenu) {
          if (ev.key === "Enter" || ev.key === " " || ev.key === "ArrowDown") {
            ev.preventDefault();
            onOpen();
            direction.current = "down";

            return;
          }

          if (ev.key === "ArrowUp") {
            ev.preventDefault();
            onOpen();
            direction.current = "up";

            return;
          }
        }
      },
      [open, handleDropdownMenuKeyDown, isButtonMenu, onOpen, isSubmenu],
    );

  useEffect(() => {
    if (open && direction.current && isButtonMenu && !isSubmenu) {
      const items = scrollRef.current?.querySelectorAll(
        `li[data-component='popover-menu-item']:not([aria-disabled='true']) button, a`,
      );

      const itemToFocus = direction.current === "up" ? items?.[items.length - 1] : items?.[0];
      direction.current = null;

      if (itemToFocus && focusItemOnOpen) {
        setAriaActivedescendant(itemToFocus.id);
        setFocus(itemToFocus as HTMLElement, undefined, isButtonMenu);
      }
    }
  }, [open, isButtonMenu, isSubmenu, focusItemOnOpen]);

  /* eslint-disable @typescript-eslint/no-use-before-define */
  const renderSubmenu = useCallback(
    (props: SubmenuRenderProps) => (
      <PopoverMenu
        open={props.open}
        onOpen={props.onOpen}
        onClose={(ev) => {
          props.onClose();

          // need to call both submenu and parent menu close handlers when clicking outside
          if (
            ev?.type === "click" &&
            !wrapperRef.current?.contains(ev?.target as Node)
          ) {
            onClose(ev);
          }
        }}
        size={props.size}
        isButtonMenu
        isSubmenu
        width={props.submenuWidth}
        listRef={props.ref}
        focusSubmenuParent={props.focusSubmenuParent}
        popoverControl={(_ref, controlProps) => props.control(controlProps)}
        placement="right-start"
        controlReference={props.triggerRef}
      >
        {props.submenu}
      </PopoverMenu>
    ),
    [onClose],
  );
  /* eslint-enable @typescript-eslint/no-use-before-define */

  const rendered = (
    <>
      <Control<TRef>
        open={open}
        isButtonMenu={isButtonMenu}
        isSubmenu={isSubmenu}
        popoverControl={popoverControl}
        controlRef={controlRef}
        controlWrapperRef={controlWrapperRef}
        onKeyDown={handleControlKeyDown}
        listId={listId.current}
        aria-activedescendant={
          open && ariaActivedescendant ? ariaActivedescendant : undefined
        }
      />
      <PopoverMenuContext.Provider
        value={{
          size,
          isButtonMenu,
          isSubmenu,
          onSubmenuCloseContext: isSubmenu ? onClose : undefined,
          focusSubmenuParent: isSubmenu ? focusSubmenuParent : undefined,
          renderSubmenu: isButtonMenu && !isSubmenu ? renderSubmenu : undefined,
        }}
      >
        {open && (
          <Menu
            open={open}
            placement={placement}
            controlWrapperRef={popoverReference}
            size={size}
            listRef={combinedListRef}
            listboxAriaLabelledBy={listboxAriaLabelledBy}
            isButtonMenu={isButtonMenu}
            onKeyDown={handleDropdownMenuKeyDown}
            middleware={computedMiddleware}
            scrollRef={scrollRef}
            listId={listId.current}
            disablePortal={!isSubmenu}
          >
            {wrappedChildren}
          </Menu>
        )}
      </PopoverMenuContext.Provider>
    </>
  );

  return isSubmenu ? (
    rendered
  ) : (
    <div ref={combinedWrapperRef} data-component="popover-menu" {...rest}>
      {rendered}
    </div>
  );
};

const PopoverMenu = forwardRef(PopoverMenuInner) as <
  TRef extends FocusableHandle = NonNullable<ButtonHandle>,
>(
  props: PopoverMenuProps<TRef> & {
    ref?: React.ForwardedRef<HTMLUListElement>;
  },
) => React.ReactElement;

export default PopoverMenu;

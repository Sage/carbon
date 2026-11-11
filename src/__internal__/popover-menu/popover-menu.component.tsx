import React, {
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useState,
  useContext,
} from "react";
import styled, { css } from "styled-components";
import type { CSSObject } from "styled-components";
import Popover, { PopoverProps } from "../popover";
import { flip, offset, size, hide } from "@floating-ui/dom";
import { wrapChildrenInItem, buttonMenuItemQuerySelector } from "./utils";
import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import {
  useHandleDropdownMenuKeyDown,
  setFocus,
  type TypeaheadHandler,
} from "./hooks";
import guid from "../utils/helpers/guid";
import {
  PopoverMenuContext,
  PopoverMenuContextProps,
  PopoverControlProps,
  SubmenuRenderProps,
} from "./contexts";
import { TagProps } from "../utils/helpers/tags";
import combineRefs from "../utils/helpers/combine-refs";
import { TableBodyContext } from "../../components/table/__internal__/contexts";
import { nextElementToFocus } from "../../hooks/__internal__/useFocusPortalContent";

const PopoverControlWrapper = styled.div<{
  $controlWrapperStyle?: CSSObject;
}>`
  display: inline-block;
  ${({ $controlWrapperStyle }) => $controlWrapperStyle}
`;

interface ListProps {
  $size: PopoverMenuContextProps["size"];
  $maxHeight?: string;
  $isButtonMenu?: PopoverMenuContextProps["isButtonMenu"];
}

export const List = styled.ul<ListProps>`
  margin: var(--global-space-none);
  padding: var(--global-space-none);
  background-color: var(--popover-bg-default);
  display: flex;
  flex-direction: column;

  list-style-type: "";
  list-style: none;

  ${({ $isButtonMenu, $size, $maxHeight }) =>
    !$isButtonMenu &&
    css`
      overflow: hidden auto;
      -webkit-overflow-scrolling: touch;
      max-height: ${$maxHeight ??
      `calc(5 * var(--global-size-${$size.charAt(0)}))`};
    `}
`;

const paddingSize = {
  small: "var(--global-space-comp-xs)",
  medium: "var(--global-space-comp-s)",
  large: "var(--global-space-comp-m)",
};

const MenuWrapper = styled.div<ListProps>`
  box-shadow: var(--global-depth-lvl1);
  border-radius: var(--global-radius-container-m);
  background-color: var(--popover-bg-default);
  width: max-content;
  position: relative;
  z-index: calc(var(--carbon-zindex-overlay) + 2);

  padding: ${({ $size }) => css`
    ${paddingSize[$size]} var(--global-space-none)
  `};

  ${({ $isButtonMenu }) =>
    !$isButtonMenu &&
    css`
      overflow: hidden;
      max-width: 100%;
      max-height: 100%;
    `}
`;

const ScrollWrapper = styled.div`
  max-height: 100%;
  width: 100%;
`;

export type FocusableHandle =
  | HTMLElement
  | HTMLButtonElement
  | HTMLAnchorElement
  | HTMLInputElement;

export interface PopoverMenuProps<TRef extends FocusableHandle = HTMLElement>
  extends TagProps {
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
  submenuControlRef?: React.MutableRefObject<HTMLElement | null>;
  /** id applied to the outer wrapper element (e.g. for aria-controls) */
  id?: string;
  /** Blur handler for the outer wrapper element */
  onBlur?: React.FocusEventHandler<HTMLElement>;
  /** Callback when the popover menu is opened */
  onOpen?: () => void;
  /** Callback when the popover menu is closed */
  onClose: (e?: Event, value?: string) => void;
  /** Set the custom width of the menu */
  width?: string;
  /** Whether the menu width should match the control reference width */
  matchReferenceWidth?: boolean;
  /** Hide the menu when its control is fully clipped. Defaults to false. */
  hideWhenReferenceHidden?: boolean;
  /** Render the menu inline instead of in a portal. Submenus always use a portal. */
  disablePortal?: boolean;
  /** Strategy used to position the popover */
  popoverStrategy?: PopoverProps["popoverStrategy"];
  /** Override default control reference for popover */
  controlReference?: React.RefObject<HTMLDivElement | HTMLLIElement>;
  /** Set the custom max-height of the menu list */
  maxHeight?: string;
  /** Custom styles for the control wrapper element */
  controlWrapperStyle?: CSSObject;
  /** Aria labelledby for the listbox */
  listboxAriaLabelledBy?: string;
  /** Aria label for the listbox */
  listboxAriaLabel?: string;
  /** Controls the keyboard navigation behavior and sets roles to `list` and `listitem` */
  isButtonMenu?: boolean;
  /** Flag to notify that the menu is a submenu */
  isSubmenu?: boolean;
  /** Identifies the root menu and all its submenu portals. */
  menuTreeId?: string;
  /** Ref to the listbox/menu element */
  listRef?: React.Ref<HTMLUListElement>;
  /** Callback for handling typeahead keyboard navigation */
  typeahead?: (args: TypeaheadHandler) => void;
}

const OFFSET = 8;
const SUBMENU_OFFSET = 0;

const menuPopoverMiddleware = (
  width?: string,
  isButtonMenu?: boolean,
  isSubmenu?: boolean,
  matchReferenceWidth?: boolean,
  hideWhenReferenceHidden?: boolean,
) => [
  offset(isSubmenu ? SUBMENU_OFFSET : OFFSET),
  flip({
    fallbackStrategy: "initialPlacement",
  }),
  size({
    apply({ rects, elements }) {
      if (isButtonMenu && !matchReferenceWidth && !width) return;
      elements.floating.style.width = width || `${rects.reference.width}px`;
    },
  }),
  ...(hideWhenReferenceHidden ? [hide({ strategy: "referenceHidden" })] : []),
];

const focusControl = (handle: FocusableHandle | HTMLElement | null) => {
  handle?.focus();
};

interface MenuProps {
  open: boolean;
  placement: PopoverMenuProps["placement"];
  controlWrapperRef: React.RefObject<HTMLDivElement | HTMLLIElement>;
  size: PopoverMenuContextProps["size"];
  listRef: React.Ref<HTMLUListElement>;
  listboxAriaLabelledBy?: string;
  isButtonMenu?: boolean;
  children: React.ReactNode;
  onKeyDown: (ev: React.KeyboardEvent<HTMLElement>) => void;
  middleware: PopoverProps["middleware"];
  scrollRef: React.RefObject<HTMLDivElement>;
  menuTreeId: string;
  listId: string;
  disablePortal?: boolean;
  portalTarget?: HTMLElement | null;
  listboxAriaLabel?: string;
  maxHeight?: string;
  popoverStrategy?: PopoverProps["popoverStrategy"];
}

const Menu = ({
  open,
  placement,
  controlWrapperRef,
  size,
  listRef,
  listboxAriaLabelledBy,
  listboxAriaLabel,
  isButtonMenu,
  children,
  onKeyDown,
  middleware,
  scrollRef,
  menuTreeId,
  listId,
  disablePortal,
  portalTarget,
  maxHeight,
  popoverStrategy,
}: MenuProps) => {
  return (
    <Popover
      placement={placement}
      reference={controlWrapperRef}
      isOpen={open}
      data-component="popover-menu"
      middleware={middleware}
      disablePortal={disablePortal}
      portalTarget={portalTarget}
      popoverStrategy={popoverStrategy}
    >
      <MenuWrapper
        $size={size}
        onKeyDown={onKeyDown}
        data-role="menu-wrapper"
        onMouseDown={(e) => e.preventDefault()}
        $isButtonMenu={isButtonMenu}
      >
        <ScrollWrapper
          ref={scrollRef}
          data-component="scroll-wrapper"
          data-menu-tree-id={menuTreeId}
        >
          <List
            $size={size}
            ref={listRef}
            role={isButtonMenu ? "list" : "listbox"}
            id={listId}
            aria-labelledby={listboxAriaLabelledBy}
            $isButtonMenu={isButtonMenu}
            aria-label={listboxAriaLabel}
            $maxHeight={maxHeight}
          >
            {children}
          </List>
        </ScrollWrapper>
      </MenuWrapper>
    </Popover>
  );
};

interface ControlProps<TRef extends FocusableHandle = HTMLElement> {
  open: boolean;
  isButtonMenu?: boolean;
  isSubmenu?: boolean;
  popoverControl: PopoverMenuProps<TRef>["popoverControl"];
  controlRef: React.RefObject<TRef>;
  controlWrapperRef: React.RefObject<HTMLDivElement>;
  onKeyDown: (ev: React.KeyboardEvent<HTMLElement>) => void;
  listId: string;
  "aria-activedescendant"?: string;
  controlWrapperStyle?: CSSObject;
}

const Control = <TRef extends FocusableHandle = HTMLElement>({
  open,
  isButtonMenu,
  isSubmenu,
  popoverControl,
  controlRef,
  controlWrapperRef,
  onKeyDown,
  listId,
  "aria-activedescendant": ariaActivedescendant,
  controlWrapperStyle,
}: ControlProps<TRef>) => {
  return isSubmenu ? (
    popoverControl(controlRef, {
      "aria-haspopup": "true",
      // this will cause axe to flag as incomplete, that means it needs manually checking
      "aria-controls": open ? listId : undefined,
      "aria-expanded": open,
    })
  ) : (
    <PopoverControlWrapper
      ref={controlWrapperRef}
      onKeyDown={onKeyDown}
      data-component="popover-menu-control"
      $controlWrapperStyle={controlWrapperStyle}
    >
      {popoverControl(controlRef, {
        "aria-haspopup": isButtonMenu ? "true" : "listbox",
        // this will cause axe to flag as incomplete, that means it needs manually checking
        "aria-controls": open ? listId : undefined,
        "aria-expanded": open,
        "aria-activedescendant": isButtonMenu
          ? undefined
          : ariaActivedescendant,
        role: isButtonMenu ? undefined : "combobox",
      })}
    </PopoverControlWrapper>
  );
};

const PopoverMenuInner = <TRef extends FocusableHandle = HTMLElement>(
  {
    children,
    open,
    popoverControl,
    size = "medium",
    placement = "bottom-end",
    onOpen,
    onClose,
    width,
    matchReferenceWidth = false,
    hideWhenReferenceHidden = false,
    disablePortal = true,
    popoverStrategy = "absolute",
    listboxAriaLabelledBy,
    listboxAriaLabel,
    isButtonMenu = false,
    isSubmenu = false,
    menuTreeId: parentMenuTreeId,
    id,
    controlReference,
    listRef,
    controlWrapperStyle,
    maxHeight,
    typeahead,
    ...rest
  }: PopoverMenuProps<TRef>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const controlWrapperRef = useRef<HTMLDivElement | null>(null);
  const popoverReference: React.RefObject<HTMLDivElement | HTMLLIElement> =
    controlReference ?? controlWrapperRef;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const internalListRef = useRef<HTMLUListElement | null>(null);
  const combinedListRef = combineRefs(listRef, internalListRef);
  const listId = useRef(id ?? `popover-menu-wrapper-${guid()}`);
  const menuTreeId = parentMenuTreeId ?? listId.current;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const combinedWrapperRef = combineRefs(wrapperRef, ref);
  const wrappedChildren = wrapChildrenInItem(children);
  const controlRef = useRef<TRef>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const handleMenuClose = useCallback(
    (ev?: Event) => {
      const shouldRestoreTabOrder =
        isButtonMenu &&
        !isSubmenu &&
        ev instanceof KeyboardEvent &&
        ev.key === "Tab" &&
        ev.target instanceof Node &&
        !controlWrapperRef.current?.contains(ev.target);

      if (shouldRestoreTabOrder) {
        // Removing the focused item makes native Tab navigation unreliable,
        // especially when the menu lives in a portal. Resolve the destination
        // relative to its trigger while both are still mounted.
        ev.preventDefault();
        const control = controlRef.current ?? controlWrapperRef.current;
        const trigger =
          control?.querySelector<HTMLElement>(
            "button, a[href], input, select, textarea",
          ) ?? control;
        const next =
          !ev.shiftKey && trigger && scrollRef.current
            ? nextElementToFocus(
                trigger,
                scrollRef.current,
                Array.from(
                  trigger.ownerDocument.querySelectorAll<HTMLElement>(
                    `[data-menu-tree-id="${menuTreeId}"]`,
                  ),
                ),
              )
            : undefined;
        onClose(ev);
        const destination = (next ?? trigger) as HTMLElement | undefined;
        if (
          destination &&
          destination.ownerDocument.activeElement !== destination
        ) {
          destination.focus({ preventScroll: ev.shiftKey });
        }
        return;
      }
      onClose(ev);
    },
    [isButtonMenu, isSubmenu, onClose, menuTreeId],
  );
  const lastClickAwayEvent = useRef<Event | null>(null);
  const handleClickAway = useCallback(
    (ev: Event) => {
      if (!open || lastClickAwayEvent.current === ev) return;
      lastClickAwayEvent.current = ev;
      // Keep the document listener attached while closing a submenu during
      // click bubbling, so its inside-click marker is consumed by this event.
      onCloseRef.current(ev);
    },
    [open],
  );
  const handleClickInside = useClickAwayListener(handleClickAway);
  const [ariaActivedescendant, setAriaActivedescendant] = useState<string>("");
  const computedMiddleware = menuPopoverMiddleware(
    width,
    isButtonMenu,
    isSubmenu,
    matchReferenceWidth,
    hideWhenReferenceHidden,
  );
  const direction = useRef<"up" | "down" | null>(null);

  const handleSubmenuParentFocus = useCallback(() => {
    /* istanbul ignore else */
    if (isSubmenu) {
      const node = controlReference?.current?.querySelector(
        "button, a",
      ) as HTMLElement | null;

      /* istanbul ignore else */
      if (node) {
        focusControl(node);
      }
    }
  }, [isSubmenu, controlReference]);

  const handleMainWrapperKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (open && ev.key === "Escape") {
        ev.preventDefault();
        ev.stopPropagation();
        if (isSubmenu) {
          handleSubmenuParentFocus();
        }
        onClose(ev);
        if (!isSubmenu) {
          focusControl(controlRef.current);
        }
      }
    },
    [open, onClose, isSubmenu, handleSubmenuParentFocus],
  );

  useEffect(() => {
    const el = isSubmenu ? scrollRef.current : wrapperRef.current;
    // Portalled root menus do not bubble native events through the control wrapper.
    const menuEl = !isSubmenu && !disablePortal ? scrollRef.current : null;

    el?.addEventListener("click", handleClickInside, { passive: true });
    el?.addEventListener("keydown", handleMainWrapperKeyDown);
    menuEl?.addEventListener("click", handleClickInside, { passive: true });
    menuEl?.addEventListener("keydown", handleMainWrapperKeyDown);

    // When mounted as a submenu, also mark clicks on the trigger <li> as "inside"
    // so the click-away listener doesn't fire when the trigger button is clicked
    const triggerEl = isSubmenu ? controlReference?.current : null;
    triggerEl?.addEventListener("click", handleClickInside, { passive: true });

    return () => {
      el?.removeEventListener("click", handleClickInside);
      el?.removeEventListener("keydown", handleMainWrapperKeyDown);
      menuEl?.removeEventListener("click", handleClickInside);
      menuEl?.removeEventListener("keydown", handleMainWrapperKeyDown);
      triggerEl?.removeEventListener("click", handleClickInside);
    };
  }, [
    isSubmenu,
    handleClickInside,
    handleMainWrapperKeyDown,
    controlReference,
    disablePortal,
    open,
  ]);

  const handleDropdownMenuKeyDown = useHandleDropdownMenuKeyDown(
    internalListRef,
    isButtonMenu ? () => {} : setAriaActivedescendant,
    handleMenuClose,
    {
      isButtonMenu,
      isSubmenu,
    },
    typeahead,
  );

  const { isInTable } = useContext(TableBodyContext);

  const handleControlKeyDown: React.KeyboardEventHandler<HTMLElement> =
    useCallback(
      (ev) => {
        if (
          open &&
          controlWrapperRef.current?.contains(document.activeElement)
        ) {
          handleDropdownMenuKeyDown(ev);

          return;
        } else if (!open && isButtonMenu && !isInTable && !isSubmenu) {
          if (ev.key === "ArrowDown") {
            ev.preventDefault();
            onOpen?.();
            direction.current = "down";

            return;
          }

          /* istanbul ignore else */
          if (ev.key === "ArrowUp") {
            ev.preventDefault();
            onOpen?.();
            direction.current = "up";

            return;
          }
        }
      },
      [
        open,
        handleDropdownMenuKeyDown,
        isButtonMenu,
        isInTable,
        onOpen,
        isSubmenu,
      ],
    );

  useEffect(() => {
    let rafId: number;

    if (open && isButtonMenu && !isSubmenu) {
      rafId = requestAnimationFrame(() => {
        const items = scrollRef.current?.querySelectorAll(
          buttonMenuItemQuerySelector(false),
        );
        const itemToFocus =
          direction.current === "up" ? items?.[items.length - 1] : items?.[0];
        direction.current = null;

        /* istanbul ignore else */
        if (itemToFocus) {
          setAriaActivedescendant(itemToFocus.id);
          setFocus(itemToFocus as HTMLElement, undefined, isButtonMenu);
        }
      });
    }

    return () => cancelAnimationFrame(rafId);
  }, [open, isButtonMenu, isSubmenu]);

  /* eslint-disable @typescript-eslint/no-use-before-define */
  const renderSubmenu = useCallback(
    (props: SubmenuRenderProps) => {
      return (
        <PopoverMenu
          open={props.open}
          onClose={(ev) => {
            props.onClose();

            // A portalled submenu has its own click-away listener. Forward
            // clicks outside both the parent control and menu, once per event.
            if (
              ev?.type === "click" &&
              !wrapperRef.current?.contains(ev.target as Node) &&
              !scrollRef.current?.contains(ev.target as Node)
            ) {
              handleClickAway(ev);
            } else if ((ev as KeyboardEvent)?.key === "Tab") {
              handleMenuClose(ev);
            }
          }}
          size={props.size}
          isButtonMenu
          isSubmenu
          menuTreeId={menuTreeId}
          hideWhenReferenceHidden={hideWhenReferenceHidden}
          width={props.submenuWidth}
          listRef={props.ref}
          popoverControl={(_ref, controlProps) => props.control(controlProps)}
          placement="right-start"
          controlReference={props.triggerRef}
          typeahead={typeahead}
        >
          {props.submenu}
        </PopoverMenu>
      );
    },
    [
      handleMenuClose,
      handleClickAway,
      typeahead,
      hideWhenReferenceHidden,
      menuTreeId,
    ],
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
        controlWrapperStyle={controlWrapperStyle}
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
          focusSubmenuParent: isSubmenu ? handleSubmenuParentFocus : undefined,
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
            listboxAriaLabel={listboxAriaLabel}
            isButtonMenu={isButtonMenu}
            onKeyDown={handleDropdownMenuKeyDown}
            middleware={computedMiddleware}
            scrollRef={scrollRef}
            menuTreeId={menuTreeId}
            listId={listId.current}
            disablePortal={disablePortal && !isSubmenu}
            portalTarget={isSubmenu ? controlReference?.current : undefined}
            maxHeight={maxHeight}
            popoverStrategy={popoverStrategy}
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
  TRef extends FocusableHandle = HTMLElement,
>(
  props: PopoverMenuProps<TRef> & {
    ref?: React.ForwardedRef<HTMLDivElement>;
  },
) => React.ReactElement;

export default PopoverMenu;

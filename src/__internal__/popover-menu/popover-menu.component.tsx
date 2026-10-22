import React, {
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useState,
  useMemo,
  useLayoutEffect,
} from "react";
import styled, { css } from "styled-components";
import type { CSSObject } from "styled-components";
import Popover, { PopoverProps } from "../popover";
import { flip, offset, size } from "@floating-ui/dom";
import { wrapChildrenInItem, buttonMenuItemQuerySelector } from "./utils";
import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
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
import { getWindow } from "../dom/globals";

const useIsomorphicLayoutEffect = getWindow() ? useLayoutEffect : useEffect;

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

  max-height: ${({ $maxHeight, $size }) =>
    $maxHeight ?? `calc(5 * var(--global-size-${$size.charAt(0)}))`};
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
  max-width: 100%;
  position: relative;
  z-index: var(--carbon-zindex-small-overlay);

  padding: ${({ $size }) => css`
    ${paddingSize[$size]} var(--global-space-none)
  `};

  ${({ $isButtonMenu }) =>
    !$isButtonMenu &&
    css`
      overflow: hidden;
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
  /** Ref to the listbox/menu element */
  listRef?: React.Ref<HTMLUListElement>;
  /** Whether the menu may flip to the opposite placement when space is limited. */
  flipEnabled?: boolean;
  /** Data element applied to the menu wrapper. */
  menuWrapperDataElement?: string;
  /** Tab index applied to the listbox/menu element. */
  listTabIndex?: number;
  /** @internal Bypass automatic wrapping when the caller supplies complete list items. */
  wrapItems?: boolean;
  /** @internal Override list navigation for a caller-managed collection. */
  onListKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  /** @internal Active option ID for a caller-managed collection. */
  activeDescendant?: string;
  /** @internal Layout styles for the scrollable list. */
  listStyle?: React.CSSProperties;
  /** When set, PageUp and PageDown move the focus by a fixed number of items. */
  enablePageNavigation?: boolean;
  /** When set, Space and Tab confirm the currently-focused item (single-select listbox behaviour). */
  selectOnSpaceAndTab?: boolean;
  /** When set, scrolls the selected option into view on open in non-virtualised menus. */
  focusSelectedOnOpen?: boolean;
  /** When set, highlights the selected option on open and when selection changes. */
  highlightSelectedOption?: boolean;
}

const OFFSET = 8;
const SUBMENU_OFFSET = 0;

export const menuPopoverMiddleware = (
  width?: string,
  isButtonMenu?: boolean,
  isSubmenu?: boolean,
  matchReferenceWidth?: boolean,
  flipEnabled = true,
) => [
  offset(isSubmenu ? SUBMENU_OFFSET : OFFSET),
  ...(flipEnabled
    ? [
        flip({
          fallbackStrategy: "initialPlacement",
        }),
      ]
    : []),
  size({
    apply({ rects, elements }) {
      if (isButtonMenu && !matchReferenceWidth && !width) return;
      elements.floating.style.width = width || `${rects.reference.width}px`;
    },
  }),
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
  listId: string;
  disablePortal?: boolean;
  portalTarget?: HTMLElement | null;
  listboxAriaLabel?: string;
  maxHeight?: string;
  popoverStrategy?: PopoverProps["popoverStrategy"];
  listStyle?: React.CSSProperties;
  menuWrapperDataElement?: string;
  listTabIndex?: number;
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
  listId,
  disablePortal,
  portalTarget,
  maxHeight,
  popoverStrategy,
  listStyle,
  menuWrapperDataElement,
  listTabIndex,
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
        data-element={menuWrapperDataElement}
        onMouseDown={(e) => e.preventDefault()}
        $isButtonMenu={isButtonMenu}
      >
        <ScrollWrapper ref={scrollRef} data-component="scroll-wrapper">
          <List
            $size={size}
            ref={listRef}
            role={isButtonMenu ? "list" : "listbox"}
            id={listId}
            aria-labelledby={listboxAriaLabelledBy}
            $isButtonMenu={isButtonMenu}
            aria-label={listboxAriaLabel}
            $maxHeight={maxHeight}
            style={listStyle}
            tabIndex={listTabIndex}
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
    popoverStrategy = "absolute",
    listboxAriaLabelledBy,
    listboxAriaLabel,
    isButtonMenu = false,
    isSubmenu = false,
    id,
    controlReference,
    listRef,
    controlWrapperStyle,
    maxHeight,
    wrapItems = true,
    onListKeyDown,
    activeDescendant,
    listStyle,
    enablePageNavigation = false,
    selectOnSpaceAndTab = false,
    focusSelectedOnOpen = false,
    highlightSelectedOption = false,
    flipEnabled = true,
    menuWrapperDataElement,
    listTabIndex,
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
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const combinedWrapperRef = combineRefs(wrapperRef, ref);
  const wrappedChildren = useMemo(
    () => (wrapItems ? wrapChildrenInItem(children) : children),
    [children, wrapItems],
  );
  const controlRef = useRef<TRef>(null);
  const handleClickInside = useClickAwayListener(onClose);
  const [ariaActivedescendant, setAriaActivedescendant] = useState<string>("");

  useIsomorphicLayoutEffect(() => {
    if (!open) {
      setAriaActivedescendant("");
    } else if (focusSelectedOnOpen && !onListKeyDown) {
      internalListRef.current
        ?.querySelector('[aria-selected="true"]')
        ?.scrollIntoView?.({ block: "nearest" });
    }
  }, [open, focusSelectedOnOpen, onListKeyDown]);

  const highlightedSelection = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open || !highlightSelectedOption || onListKeyDown) {
      highlightedSelection.current = null;
      return;
    }
    const listbox = internalListRef.current;
    const selectedOption = listbox?.querySelector<HTMLElement>(
      '[role="option"][aria-selected="true"]:not([aria-disabled="true"])',
    );
    // Appending options or a loader must preserve the user's current highlight.
    if (selectedOption === highlightedSelection.current) return;
    highlightedSelection.current =
      selectedOption ?? /* istanbul ignore next */ null;
    listbox
      ?.querySelector<HTMLElement>('[data-has-focus="true"]')
      ?.setAttribute("data-has-focus", "false");
    selectedOption?.setAttribute("data-has-focus", "true");
    setAriaActivedescendant(
      selectedOption?.id ?? /* istanbul ignore next */ "",
    );
  }, [open, highlightSelectedOption, onListKeyDown, wrappedChildren]);

  const resolvedActivedescendant = activeDescendant ?? ariaActivedescendant;

  const computedMiddleware = useMemo(
    () =>
      menuPopoverMiddleware(
        width,
        isButtonMenu,
        isSubmenu,
        matchReferenceWidth,
        flipEnabled,
      ),
    [width, isButtonMenu, isSubmenu, matchReferenceWidth, flipEnabled],
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
        onClose();
        if (isSubmenu) {
          handleSubmenuParentFocus();
        } else {
          focusControl(controlRef.current);
        }
      }
    },
    [open, onClose, isSubmenu, handleSubmenuParentFocus],
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
  }, [
    isSubmenu,
    handleClickInside,
    handleMainWrapperKeyDown,
    controlReference,
  ]);

  const handleDropdownMenuKeyDown = useHandleDropdownMenuKeyDown(
    internalListRef,
    isButtonMenu ? () => {} : setAriaActivedescendant,
    onClose,
    {
      isButtonMenu,
      isSubmenu,
      enablePageNavigation,
      selectOnSpaceAndTab,
    },
  );

  const handleListKeyDown = onListKeyDown ?? handleDropdownMenuKeyDown;

  const handleMenuKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      handleListKeyDown(ev);
    },
    [handleListKeyDown],
  );

  const handleControlKeyDown: React.KeyboardEventHandler<HTMLElement> =
    useCallback(
      (ev) => {
        if (
          open &&
          controlWrapperRef.current?.contains(document.activeElement)
        ) {
          handleMenuKeyDown(ev);

          return;
        } else if (!open && isButtonMenu && !isSubmenu) {
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
      [open, handleMenuKeyDown, isButtonMenu, onOpen, isSubmenu],
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

            // need to call both submenu and parent menu close handlers when clicking outside
            if (
              (ev?.type === "click" &&
                !wrapperRef.current?.contains(ev?.target as Node)) ||
              (ev as KeyboardEvent)?.key === "Tab"
            ) {
              onClose(ev);
            }
          }}
          size={props.size}
          isButtonMenu
          isSubmenu
          width={props.submenuWidth}
          listRef={props.ref}
          popoverControl={(_ref, controlProps) => props.control(controlProps)}
          placement="right-start"
          controlReference={props.triggerRef}
        >
          {props.submenu}
        </PopoverMenu>
      );
    },
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
        controlWrapperStyle={controlWrapperStyle}
        onKeyDown={handleControlKeyDown}
        listId={listId.current}
        aria-activedescendant={
          open && resolvedActivedescendant
            ? resolvedActivedescendant
            : undefined
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
            onKeyDown={handleMenuKeyDown}
            middleware={computedMiddleware}
            scrollRef={scrollRef}
            listId={listId.current}
            disablePortal={!isSubmenu}
            portalTarget={isSubmenu ? controlReference?.current : undefined}
            maxHeight={maxHeight}
            popoverStrategy={popoverStrategy}
            listStyle={listStyle}
            menuWrapperDataElement={menuWrapperDataElement}
            listTabIndex={listTabIndex}
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

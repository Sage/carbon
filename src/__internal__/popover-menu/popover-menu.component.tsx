import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  forwardRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import type { CSSObject } from "styled-components";
import {
  useVirtualizer,
  defaultRangeExtractor,
  type VirtualItem,
  type Range,
} from "@tanstack/react-virtual";
import Popover, { PopoverProps } from "../popover";
import { flip, offset, size } from "@floating-ui/dom";
import { wrapChildrenInItem, buttonMenuItemQuerySelector } from "./utils";
import { MenuItem } from "./menu-item";
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
  $virtualHeight?: number;
}

export const List = styled.ul<ListProps>`
  margin: var(--global-space-none);
  padding: var(--global-space-none);
  background-color: var(--popover-bg-default);
  display: flex;
  flex-direction: column;

  max-height: ${({ $maxHeight, $size }) =>
    $maxHeight ?? `calc(5.5 * var(--global-size-${$size.charAt(0)}))`};
  list-style-type: "";
  list-style: none;

  ${({ $isButtonMenu, $size, $maxHeight }) =>
    !$isButtonMenu &&
    css`
      overflow: hidden auto;
      -webkit-overflow-scrolling: touch;
      max-height: ${$maxHeight ??
      `calc(5.5 * var(--global-size-${$size.charAt(0)}))`};
    `}

  ${({ $virtualHeight }) =>
    $virtualHeight !== undefined &&
    css`
      display: block;
      position: relative;
      height: ${$virtualHeight}px;
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

const StickyFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  position: sticky;
  bottom: 0;
  background-color: var(--popover-bg-default);
`;

const FooterDivider = styled.div`
  display: flex;
  padding-bottom: var(--global-space-comp-xs);
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: var(--global-borderwidth-xs);
    background-color: var(--container-standard-border-default);
  }
`;

const FooterSlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
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
  /** Set this prop to only render the currently-visible items into the DOM. Only supported for listbox menus
   * whose children are all `MenuItem`s (no headings or dividers). */
  enableVirtualScroll?: boolean;
  /** The number of items to render into the DOM at once, either side of the currently-visible ones.
   * Only used if the `enableVirtualScroll` prop is set. */
  virtualScrollOverscan?: number;
  /** Index of the item to scroll into view when the menu opens. Only used if the `enableVirtualScroll` prop is set. */
  initialScrollIndex?: number;
  /** When set, keyboard navigation stops at the first/last item instead of looping around. */
  disableNavigationLoop?: boolean;
  /** Content rendered below the scrollable list, inside the menu (e.g. an action button). */
  footer?: React.ReactNode;
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
  virtualHeight?: number;
  footer?: React.ReactNode;
  footerRef?: React.Ref<HTMLDivElement>;
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
  virtualHeight,
  footer,
  footerRef,
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
      popoverStrategy="absolute"
    >
      <MenuWrapper
        $size={size}
        onKeyDown={onKeyDown}
        data-role="menu-wrapper"
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
            $virtualHeight={virtualHeight}
            tabIndex={-1}
          >
            {children}
          </List>
        </ScrollWrapper>
        {footer !== undefined && (
          <StickyFooter data-role="popover-menu-footer">
            <FooterDivider data-role="popover-menu-footer-divider" />
            <FooterSlot ref={footerRef} data-role="popover-menu-footer-slot">
              {footer}
            </FooterSlot>
          </StickyFooter>
        )}
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
    listboxAriaLabelledBy,
    listboxAriaLabel,
    isButtonMenu = false,
    isSubmenu = false,
    id,
    controlReference,
    listRef,
    controlWrapperStyle,
    maxHeight,
    enableVirtualScroll = false,
    virtualScrollOverscan = 5,
    initialScrollIndex,
    disableNavigationLoop = false,
    footer,
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
  const wrappedChildren = wrapChildrenInItem(children);
  const controlRef = useRef<TRef>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const handleClickInside = useClickAwayListener(onClose);
  const [ariaActivedescendant, setAriaActivedescendant] = useState<string>("");

  // Virtual scrolling is only supported for listbox menus whose items are all `MenuItem`s.
  const itemsArray = (wrappedChildren ?? []) as React.ReactElement[];
  const canVirtualize =
    enableVirtualScroll &&
    !isButtonMenu &&
    itemsArray.length > 0 &&
    itemsArray.every((child) => child.type === MenuItem);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [rowSize, setRowSize] = useState(40);

  const virtualizer = useVirtualizer({
    count: canVirtualize ? itemsArray.length : 0,
    getScrollElement: () =>
      open && canVirtualize ? internalListRef.current : null,
    estimateSize: () => rowSize,
    overscan: virtualScrollOverscan,
    // Ensure the currently-active and selected items are always rendered so keyboard navigation
    // and `aria-activedescendant` always reference a real element.
    rangeExtractor: (range: Range) => {
      const indexes = new Set(defaultRangeExtractor(range));
      if (activeIndex >= 0) {
        indexes.add(activeIndex);
      }
      if (initialScrollIndex !== undefined && initialScrollIndex >= 0) {
        indexes.add(initialScrollIndex);
      }
      // TanStack requires the returned indexes to be sorted ascending.
      return [...indexes].sort((a, b) => a - b);
    },
  });

  const virtualItems = canVirtualize ? virtualizer.getVirtualItems() : [];
  const virtualHeight = canVirtualize ? virtualizer.getTotalSize() : undefined;

  const optionIdForIndex = useCallback(
    (index: number) => `${listId.current}-option-${index}`,
    [],
  );

  // Selected/active items must stay mounted even when scrolled outside the virtual window.
  const retainedIndexes: number[] = [];
  if (initialScrollIndex !== undefined && initialScrollIndex >= 0) {
    retainedIndexes.push(initialScrollIndex);
  }
  if (activeIndex >= 0 && activeIndex !== initialScrollIndex) {
    retainedIndexes.push(activeIndex);
  }
  const renderedIndexes = new Set(virtualItems.map((item) => item.index));

  const renderedChildren = canVirtualize
    ? [
        ...virtualItems.map((virtualItem: VirtualItem) =>
          React.cloneElement(itemsArray[virtualItem.index], {
            key: virtualItem.key,
            id: optionIdForIndex(virtualItem.index),
            "data-index": virtualItem.index,
            "data-has-focus":
              activeIndex === virtualItem.index ? "true" : undefined,
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualItem.start}px)`,
            },
          }),
        ),
        ...retainedIndexes
          .filter((index) => !renderedIndexes.has(index))
          .map((index) =>
            React.cloneElement(itemsArray[index], {
              key: `retained-${index}`,
              id: optionIdForIndex(index),
              "data-index": index,
              "data-has-focus": activeIndex === index ? "true" : undefined,
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${index * rowSize}px)`,
              },
            }),
          ),
        // In-flow spacer establishes the listbox's scroll range; the options above
        // are absolutely positioned and cannot size the scroll container themselves.
        <li
          key="virtual-scroll-spacer"
          data-role="virtual-scroll-spacer"
          role="presentation"
          aria-hidden="true"
          style={{
            display: "block",
            height: virtualHeight,
            margin: 0,
            padding: 0,
            listStyle: "none",
            pointerEvents: "none",
          }}
        />,
      ]
    : wrappedChildren;

  const resolvedActivedescendant = canVirtualize
    ? activeIndex >= 0
      ? optionIdForIndex(activeIndex)
      : ""
    : ariaActivedescendant;

  // Measure the height of a single rendered row so the virtualizer positions items accurately.
  useLayoutEffect(() => {
    if (!open || !canVirtualize) return;
    const firstItem = internalListRef.current?.querySelector("li");
    const measured = firstItem?.getBoundingClientRect().height;
    if (measured && measured > 0 && measured !== rowSize) {
      setRowSize(measured);
    }
  }, [open, canVirtualize, rowSize]);

  // Reset the active item and scroll the selected item into view whenever the menu opens/closes.
  useEffect(() => {
    if (open) {
      if (canVirtualize) {
        if (initialScrollIndex !== undefined && initialScrollIndex >= 0) {
          virtualizer.scrollToIndex(initialScrollIndex, { align: "center" });
        }
      } else {
        internalListRef.current
          ?.querySelector('[aria-selected="true"]')
          ?.scrollIntoView?.({ block: "nearest" });
      }
    } else if (canVirtualize) {
      setActiveIndex(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, canVirtualize, initialScrollIndex]);

  const moveActiveIndex = useCallback(
    (nextIndex: number) => {
      setActiveIndex(nextIndex);
      virtualizer.scrollToIndex(nextIndex, { align: "auto" });
    },
    [virtualizer],
  );

  const handleVirtualKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      const count = itemsArray.length;
      /* istanbul ignore if */
      if (count === 0) return;

      const fallback =
        initialScrollIndex !== undefined && initialScrollIndex >= 0
          ? initialScrollIndex
          : 0;

      switch (ev.key) {
        case "ArrowDown":
          ev.preventDefault();
          ev.stopPropagation();
          moveActiveIndex(
            activeIndex < 0
              ? fallback
              : disableNavigationLoop
                ? Math.min(activeIndex + 1, count - 1)
                : (activeIndex + 1) % count,
          );
          break;
        case "ArrowUp":
          ev.preventDefault();
          ev.stopPropagation();
          moveActiveIndex(
            activeIndex < 0
              ? initialScrollIndex !== undefined && initialScrollIndex >= 0
                ? initialScrollIndex
                : count - 1
              : disableNavigationLoop
                ? Math.max(activeIndex - 1, 0)
                : (activeIndex - 1 + count) % count,
          );
          break;
        case "Home":
          ev.preventDefault();
          moveActiveIndex(0);
          break;
        case "End":
          ev.preventDefault();
          moveActiveIndex(count - 1);
          break;
        case "Enter":
          /* istanbul ignore else */
          if (activeIndex >= 0) {
            ev.preventDefault();
            ev.stopPropagation();
            document.getElementById(optionIdForIndex(activeIndex))?.click();
          }
          break;
        case "Tab":
          onClose(ev.nativeEvent);
          break;
        /* istanbul ignore next */
        default:
          break;
      }
    },
    [
      itemsArray.length,
      activeIndex,
      initialScrollIndex,
      disableNavigationLoop,
      moveActiveIndex,
      optionIdForIndex,
      onClose,
    ],
  );

  const computedMiddleware = menuPopoverMiddleware(
    width,
    isButtonMenu,
    isSubmenu,
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
      disableNavigationLoop,
    },
  );

  const handleListKeyDown = canVirtualize
    ? handleVirtualKeyDown
    : handleDropdownMenuKeyDown;

  const handleListKeyDownWithFooter = useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      // Tab moves focus naturally; the focusin listener decides whether to close.
      if (ev.key === "Tab") return;
      handleListKeyDown(ev);
    },
    [handleListKeyDown],
  );

  useEffect(() => {
    if (!open || isSubmenu || isButtonMenu) return undefined;

    const isAllowedFocusTarget = (target: EventTarget | null) =>
      target instanceof Node &&
      (controlWrapperRef.current?.contains(target) ||
        footerRef.current?.contains(target));

    const handleFocusIn = (ev: FocusEvent) => {
      if (!isAllowedFocusTarget(ev.target)) {
        onClose(ev);
      }
    };

    const handleFocusOut = (ev: FocusEvent) => {
      if (
        isAllowedFocusTarget(ev.target) &&
        !isAllowedFocusTarget(ev.relatedTarget)
      ) {
        onClose(ev);
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [open, isSubmenu, isButtonMenu, onClose]);

  const handleControlKeyDown: React.KeyboardEventHandler<HTMLElement> =
    useCallback(
      (ev) => {
        if (
          open &&
          controlWrapperRef.current?.contains(document.activeElement)
        ) {
          handleListKeyDownWithFooter(ev);

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
      [open, handleListKeyDownWithFooter, isButtonMenu, onOpen, isSubmenu],
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
            onKeyDown={handleListKeyDownWithFooter}
            middleware={computedMiddleware}
            scrollRef={scrollRef}
            listId={listId.current}
            disablePortal={!isSubmenu}
            portalTarget={isSubmenu ? controlReference?.current : undefined}
            maxHeight={maxHeight}
            virtualHeight={virtualHeight}
            footer={footer}
            footerRef={footerRef}
          >
            {renderedChildren}
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

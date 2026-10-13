import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  defaultRangeExtractor,
  measureElement as measureVirtualElement,
  type Range,
  useVirtualizer,
} from "@tanstack/react-virtual";
import { MenuItem } from "../menu-item";
import type { MenuItemProps } from "../menu-item/menu-item.component";
import { PAGE_NAVIGATION_SIZE } from "./useHandleDropdownMenuKeyDown";

const getMenuItemsInRow = (
  row: React.ReactElement,
): React.ReactElement<MenuItemProps>[] => {
  if (row.type === MenuItem) {
    return [row as React.ReactElement<MenuItemProps>];
  }

  const menuItems: React.ReactElement<MenuItemProps>[] = [];
  React.Children.forEach(row.props.children, (child) => {
    if (React.isValidElement(child)) {
      menuItems.push(...getMenuItemsInRow(child));
    }
  });
  return menuItems;
};

const cloneRowMenuItem = (
  row: React.ReactElement,
  props: Partial<MenuItemProps>,
): React.ReactElement => {
  if (row.type === MenuItem) {
    return React.cloneElement(row as React.ReactElement<MenuItemProps>, props);
  }

  return React.cloneElement(row, {
    children: React.Children.map(row.props.children, (child) =>
      React.isValidElement(child) ? cloneRowMenuItem(child, props) : child,
    ),
  });
};

interface UsePopoverMenuVirtualizationProps {
  wrappedChildren: React.ReactNode[] | undefined;
  open: boolean;
  enableVirtualScroll: boolean;
  isButtonMenu: boolean;
  virtualScrollOverscan: number;
  initialScrollIndex?: number;
  enablePageNavigation: boolean;
  selectOnSpaceAndTab: boolean;
  focusSelectedOnOpen: boolean;
  highlightSelectedOption: boolean;
  internalListRef: MutableRefObject<HTMLUListElement | null>;
  listId: string;
  setAriaActivedescendant: React.Dispatch<React.SetStateAction<string>>;
  ariaActivedescendant: string;
  onClose: (ev?: Event) => void;
}

const usePopoverMenuVirtualization = ({
  wrappedChildren,
  open,
  enableVirtualScroll,
  isButtonMenu,
  virtualScrollOverscan,
  initialScrollIndex,
  enablePageNavigation,
  selectOnSpaceAndTab,
  focusSelectedOnOpen,
  highlightSelectedOption,
  internalListRef,
  listId,
  setAriaActivedescendant,
  ariaActivedescendant,
  onClose,
}: UsePopoverMenuVirtualizationProps) => {
  const itemsArray = useMemo(
    () => (wrappedChildren ?? []) as React.ReactElement[],
    [wrappedChildren],
  );
  const rowMenuItems = useMemo(
    () =>
      itemsArray.map((item) => {
        const menuItems = getMenuItemsInRow(item);
        return menuItems.length === 1 ? menuItems[0] : undefined;
      }),
    [itemsArray],
  );
  const selectedItemIndex = rowMenuItems.findIndex(
    (item) => item?.props.selected || item?.props["aria-selected"] === true,
  );
  const canVirtualize =
    enableVirtualScroll &&
    !isButtonMenu &&
    itemsArray.length > 0 &&
    rowMenuItems.every(Boolean);

  const itemKeyForIndex = useCallback(
    (index: number) =>
      rowMenuItems[index]?.props.id ??
      rowMenuItems[index]?.key ??
      (itemsArray[index].key as React.Key),
    [itemsArray, rowMenuItems],
  );
  const enabledIndexes = useMemo(
    () =>
      rowMenuItems.reduce<number[]>((indexes, item, index) => {
        if (!item) return indexes;
        const ariaDisabled = item.props["aria-disabled"];
        if (
          !item.props.disabled &&
          ariaDisabled !== true &&
          ariaDisabled !== "true"
        ) {
          indexes.push(index);
        }
        return indexes;
      }, []),
    [rowMenuItems],
  );
  const optionCount = rowMenuItems.filter(Boolean).length;
  const optionPositions = useMemo(() => {
    let position = 0;
    return rowMenuItems.map((item) => (item ? (position += 1) : undefined));
  }, [rowMenuItems]);

  const selectedItemKey =
    selectedItemIndex >= 0 ? itemKeyForIndex(selectedItemIndex) : null;
  const selectedItemEnabled = enabledIndexes.includes(selectedItemIndex);
  const [activeItemKey, setActiveItemKey] = useState<React.Key | null>(null);
  const resolvedActiveIndex = enabledIndexes.find(
    (index) => itemKeyForIndex(index) === activeItemKey,
  );
  const virtualizer = useVirtualizer({
    count: canVirtualize ? itemsArray.length : 0,
    getScrollElement: () =>
      open && canVirtualize ? internalListRef.current : null,
    estimateSize: () => 40,
    // Ref callbacks run before the popover has its final width, so measuring
    // their offsetHeight can cache a temporarily wrapped option. ResizeObserver
    // supplies the settled size (and later changes) through its entry.
    measureElement: (element, entry, instance) =>
      entry
        ? measureVirtualElement(element, entry, instance)
        : (instance
            .getVirtualItems()
            .find(
              (item) =>
                item.index === Number(element.getAttribute("data-index")),
            )?.size ?? 40),
    getItemKey: itemKeyForIndex,
    overscan: virtualScrollOverscan,
    // Ensure the currently-active and selected items are always rendered so keyboard navigation
    // and `aria-activedescendant` always reference a real element.
    rangeExtractor: (range: Range) => {
      const indexes = new Set(defaultRangeExtractor(range));
      if (resolvedActiveIndex !== undefined) {
        indexes.add(resolvedActiveIndex);
      }
      if (initialScrollIndex !== undefined && initialScrollIndex >= 0) {
        indexes.add(initialScrollIndex);
      }
      return [...indexes].sort((a, b) => a - b);
    },
  });

  const virtualItems = canVirtualize ? virtualizer.getVirtualItems() : [];
  const virtualHeight = canVirtualize ? virtualizer.getTotalSize() : undefined;

  const optionIdForIndex = useCallback(
    (index: number) =>
      rowMenuItems[index]?.props.id ??
      `${listId}-option-${encodeURIComponent(String(itemKeyForIndex(index)))}`,
    [itemKeyForIndex, listId, rowMenuItems],
  );

  const renderedChildren = canVirtualize
    ? [
        ...virtualItems.map((virtualItem) => {
          const row = itemsArray[virtualItem.index];
          const optionProps = {
            id: optionIdForIndex(virtualItem.index),
            "aria-setsize": optionCount,
            "aria-posinset": optionPositions[virtualItem.index],
            "data-has-focus":
              resolvedActiveIndex === virtualItem.index ? "true" : undefined,
          };
          const positionedStyle: React.CSSProperties = {
            ...row.props.style,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${virtualItem.start}px)`,
          };

          if (row.type === MenuItem) {
            return React.cloneElement(row, {
              key: virtualItem.key,
              ...optionProps,
              "data-index": virtualItem.index,
              measureElement: virtualizer.measureElement,
              style: positionedStyle,
            });
          }

          const rowWithOption = cloneRowMenuItem(row, optionProps);
          return React.cloneElement(rowWithOption, {
            key: virtualItem.key,
            "data-index": virtualItem.index,
            ref: virtualizer.measureElement,
            style: positionedStyle,
          });
        }),
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
    ? resolvedActiveIndex !== undefined
      ? optionIdForIndex(resolvedActiveIndex)
      : ""
    : ariaActivedescendant;

  useLayoutEffect(() => {
    if (!open) {
      if (canVirtualize) {
        setActiveItemKey(null);
        virtualizer.measure();
      } else {
        setAriaActivedescendant("");
      }
      return;
    }

    if (canVirtualize) {
      if (initialScrollIndex !== undefined && initialScrollIndex >= 0) {
        virtualizer.scrollToIndex(initialScrollIndex, { align: "center" });
      }
      return;
    }

    if (focusSelectedOnOpen) {
      internalListRef.current
        ?.querySelector('[aria-selected="true"]')
        ?.scrollIntoView?.({ block: "nearest" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, canVirtualize, initialScrollIndex, focusSelectedOnOpen]);

  useEffect(() => {
    if (!open || !highlightSelectedOption) return;

    if (canVirtualize) {
      setActiveItemKey(selectedItemEnabled ? selectedItemKey : null);
      return;
    }

    const listbox = internalListRef.current;
    listbox
      ?.querySelector<HTMLElement>('[data-has-focus="true"]')
      ?.setAttribute("data-has-focus", "false");

    const selectedOption = listbox?.querySelector<HTMLElement>(
      '[role="option"][aria-selected="true"]:not([aria-disabled="true"])',
    );

    if (!selectedOption) {
      setAriaActivedescendant("");
      return;
    }

    selectedOption.setAttribute("data-has-focus", "true");
    setAriaActivedescendant(selectedOption.id);
  }, [
    open,
    highlightSelectedOption,
    selectedItemKey,
    selectedItemEnabled,
    canVirtualize,
    internalListRef,
    setAriaActivedescendant,
  ]);

  useEffect(() => {
    if (
      activeItemKey !== null &&
      !enabledIndexes.some((index) => itemKeyForIndex(index) === activeItemKey)
    ) {
      setActiveItemKey(null);
    }
  }, [activeItemKey, enabledIndexes, itemKeyForIndex]);

  const moveActiveIndex = useCallback(
    (nextIndex: number) => {
      setActiveItemKey(itemKeyForIndex(nextIndex));
      virtualizer.scrollToIndex(nextIndex, { align: "auto" });
    },
    [itemKeyForIndex, virtualizer],
  );

  const handleVirtualKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      const count = enabledIndexes.length;
      /* istanbul ignore if */
      if (count === 0) return;

      const lastPosition = count - 1;
      const activePosition =
        resolvedActiveIndex === undefined
          ? -1
          : enabledIndexes.indexOf(resolvedActiveIndex);
      const initialPosition = enabledIndexes.indexOf(initialScrollIndex ?? -1);
      const moveToPosition = (position: number) =>
        moveActiveIndex(enabledIndexes[position]);
      const confirmActiveItem = () =>
        resolvedActiveIndex !== undefined &&
        document.getElementById(optionIdForIndex(resolvedActiveIndex))?.click();

      switch (ev.key) {
        case "ArrowDown":
          ev.preventDefault();
          ev.stopPropagation();
          moveToPosition(
            activePosition < 0
              ? Math.max(initialPosition, 0)
              : (activePosition + 1) % count,
          );
          break;
        case "ArrowUp":
          ev.preventDefault();
          ev.stopPropagation();
          moveToPosition(
            activePosition < 0
              ? initialPosition >= 0
                ? initialPosition
                : lastPosition
              : (activePosition - 1 + count) % count,
          );
          break;
        case "Home":
          ev.preventDefault();
          moveToPosition(0);
          break;
        case "End":
          ev.preventDefault();
          moveToPosition(lastPosition);
          break;
        case "PageUp":
          if (!enablePageNavigation) break;
          ev.preventDefault();
          moveToPosition(
            Math.max(
              (activePosition < 0
                ? initialPosition >= 0
                  ? initialPosition
                  : lastPosition
                : activePosition) - PAGE_NAVIGATION_SIZE,
              0,
            ),
          );
          break;
        case "PageDown":
          if (!enablePageNavigation) break;
          ev.preventDefault();
          moveToPosition(
            Math.min(
              (activePosition < 0
                ? Math.max(initialPosition, 0)
                : activePosition) + PAGE_NAVIGATION_SIZE,
              lastPosition,
            ),
          );
          break;
        case "Enter":
          /* istanbul ignore else */
          if (resolvedActiveIndex !== undefined) {
            ev.preventDefault();
            ev.stopPropagation();
            confirmActiveItem();
          }
          break;
        case " ":
          if (selectOnSpaceAndTab && resolvedActiveIndex !== undefined) {
            ev.preventDefault();
            ev.stopPropagation();
            confirmActiveItem();
          }
          break;
        case "Tab":
          if (selectOnSpaceAndTab && resolvedActiveIndex !== undefined) {
            confirmActiveItem();
          }
          onClose(ev.nativeEvent);
          break;
        /* istanbul ignore next */
        default:
          break;
      }
    },
    [
      enabledIndexes,
      resolvedActiveIndex,
      initialScrollIndex,
      enablePageNavigation,
      selectOnSpaceAndTab,
      moveActiveIndex,
      optionIdForIndex,
      onClose,
    ],
  );

  return {
    canVirtualize,
    handleVirtualKeyDown,
    renderedChildren,
    resolvedActivedescendant,
    virtualHeight,
  };
};

export default usePopoverMenuVirtualization;

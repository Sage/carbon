import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getWindow } from "../../../../../__internal__/dom/globals";
import {
  defaultRangeExtractor,
  measureElement as measureVirtualElement,
  useVirtualizer,
} from "@tanstack/react-virtual";
import { PAGE_NAVIGATION_SIZE } from "../../../../../__internal__/popover-menu/hooks/useHandleDropdownMenuKeyDown";

export interface SelectVirtualRow {
  key: React.Key;
  id?: string;
  disabled?: boolean;
  selected?: boolean;
  isLoader?: boolean;
}

interface UseSelectListVirtualizationProps {
  rows: SelectVirtualRow[];
  open: boolean;
  enabled: boolean;
  overscan: number;
  listRef: React.RefObject<HTMLUListElement>;
  listId: string;
  selectOnSpaceAndTab?: boolean;
  onClose: (ev?: Event) => void;
}

const browserWindow = getWindow();
const useIsomorphicLayoutEffect = browserWindow ? useLayoutEffect : useEffect;

const useSelectListVirtualization = ({
  rows,
  open,
  enabled,
  overscan,
  listRef,
  listId,
  selectOnSpaceAndTab,
  onClose,
}: UseSelectListVirtualizationProps) => {
  const optionCount = rows.filter((row) => !row.isLoader).length;
  const initialScrollIndex = rows.findIndex((row) => row.selected);
  const selectedItemKey =
    initialScrollIndex >= 0 ? rows[initialScrollIndex].key : null;
  const selectedItemEnabled =
    initialScrollIndex >= 0 && !rows[initialScrollIndex].disabled;
  const [activeItemKey, setActiveItemKey] = useState<React.Key | null>(null);
  const enabledIndexes = useMemo(
    () => rows.flatMap((row, index) => (row.disabled ? [] : [index])),
    [rows],
  );
  const itemKeyForIndex = useCallback(
    (index: number) => rows[index].key,
    [rows],
  );
  const resolvedActiveIndex = enabledIndexes.find(
    (index) => rows[index].key === activeItemKey,
  );
  const optionIdForIndex = useCallback(
    (index: number) =>
      rows[index].id ??
      `${listId}-option-${encodeURIComponent(String(rows[index].key))}`,
    [rows, listId],
  );
  const virtualizer = useVirtualizer({
    count: enabled ? rows.length : 0,
    getScrollElement: () => (open && enabled ? listRef.current : null),
    estimateSize: () => 40,
    // Wait for ResizeObserver to measure after the popover has its final width.
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
    overscan,
    rangeExtractor: (range) => {
      const indexes = new Set(defaultRangeExtractor(range));
      if (resolvedActiveIndex !== undefined) indexes.add(resolvedActiveIndex);
      if (initialScrollIndex >= 0) indexes.add(initialScrollIndex);
      return [...indexes].sort((a, b) => a - b);
    },
  });

  const scrollFrame = useRef<number>();
  const cancelPendingScroll = useCallback(() => {
    if (scrollFrame.current !== undefined) {
      browserWindow?.cancelAnimationFrame(scrollFrame.current);
      scrollFrame.current = undefined;
    }
  }, []);
  const scrollToOption = useCallback(
    (index: number, align: "auto" | "center") => {
      cancelPendingScroll();
      let attempts = 0;
      let stableFrames = 0;
      let currentAlign: "auto" | "center" | "start" | "end" = align;
      // scrollToIndex starts uncancellable retries in the installed virtualiser.
      // Own the retry frame so a newer key press always supersedes its predecessor.
      const scroll = () => {
        const offsetInfo = virtualizer.getOffsetForIndex(index, currentAlign);
        if (!offsetInfo) return;
        const [offset, resolvedAlign] = offsetInfo;
        currentAlign = resolvedAlign;
        virtualizer.scrollToOffset(offset);
        scrollFrame.current = browserWindow?.requestAnimationFrame(() => {
          scrollFrame.current = undefined;
          const updatedOffset = virtualizer.getOffsetForIndex(
            index,
            resolvedAlign,
          )?.[0];
          if (updatedOffset === undefined || !listRef.current) return;
          stableFrames =
            Math.abs(updatedOffset - listRef.current.scrollTop) <= 1 &&
            updatedOffset === offset
              ? stableFrames + 1
              : 0;
          // ResizeObserver runs after animation frames. Allow a second frame for
          // row measurements and the corresponding scroll event to settle.
          attempts += 1;
          if (attempts < 10 && stableFrames < 2) scroll();
        });
      };
      scroll();
    },
    [cancelPendingScroll, listRef, virtualizer],
  );

  useEffect(() => cancelPendingScroll, [cancelPendingScroll]);

  useIsomorphicLayoutEffect(() => {
    if (!enabled) return;
    if (!open) {
      setActiveItemKey(null);
      virtualizer.measure();
    } else if (initialScrollIndex >= 0) {
      scrollToOption(initialScrollIndex, "center");
    }
    return cancelPendingScroll;
    // The virtualizer instance is stable; scroll only when opening or changing selection.
  }, [open, enabled, initialScrollIndex]);

  useEffect(() => {
    if (open && enabled)
      setActiveItemKey(selectedItemEnabled ? selectedItemKey : null);
  }, [open, enabled, selectedItemKey, selectedItemEnabled]);

  useEffect(() => {
    if (
      activeItemKey !== null &&
      !enabledIndexes.some((index) => rows[index].key === activeItemKey)
    ) {
      setActiveItemKey(null);
    }
  }, [activeItemKey, enabledIndexes, rows]);

  useIsomorphicLayoutEffect(() => {
    if (open && enabled && resolvedActiveIndex !== undefined) {
      scrollToOption(resolvedActiveIndex, "auto");
    }
    return cancelPendingScroll;
    // Scroll after the new active row has been committed and its ref attached.
  }, [open, enabled, resolvedActiveIndex]);

  const moveActiveIndex = useCallback(
    (nextIndex: number) => setActiveItemKey(itemKeyForIndex(nextIndex)),
    [itemKeyForIndex],
  );

  const handleVirtualKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      const count = enabledIndexes.length;
      /* istanbul ignore if */
      if (count === 0 && ev.key !== "Tab") return;

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
      selectOnSpaceAndTab,
      moveActiveIndex,
      optionIdForIndex,
      onClose,
    ],
  );

  return {
    virtualItems: enabled ? virtualizer.getVirtualItems() : [],
    virtualHeight: enabled ? virtualizer.getTotalSize() : undefined,
    measureElement: virtualizer.measureElement,
    handleVirtualKeyDown,
    activeDescendant:
      resolvedActiveIndex === undefined
        ? ""
        : optionIdForIndex(resolvedActiveIndex),
    optionProps: (index: number) => ({
      id: optionIdForIndex(index),
      "aria-setsize": optionCount,
      "aria-posinset": index + 1,
      "data-has-focus": resolvedActiveIndex === index ? "true" : undefined,
    }),
  };
};

export default useSelectListVirtualization;

import { useEffect, useRef, useState } from "react";
import {
  setFocus,
  useHandleDropdownMenuKeyDown,
} from "../../../../../__internal__/popover-menu/hooks/useHandleDropdownMenuKeyDown";
import type { SelectVirtualRow } from "./use-select-list-virtualization";

interface FilterNavigationProps {
  enabled: boolean;
  open: boolean;
  filterText?: string;
  rows: SelectVirtualRow[];
  listRef: React.MutableRefObject<HTMLUListElement | null>;
  multiselect: boolean;
  selectOnSpaceAndTab?: boolean;
  onClose: (event?: Event) => void;
}

export default function useSelectListFilterNavigation({
  enabled,
  open,
  filterText = "",
  rows,
  listRef,
  multiselect,
  selectOnSpaceAndTab,
  onClose,
}: FilterNavigationProps) {
  const [activeDescendant, setActiveDescendant] = useState("");
  const previousFilter = useRef<string | null>(null);
  const previousSelected = useRef<HTMLElement | null>(null);
  const handleKeyDown = useHandleDropdownMenuKeyDown(
    listRef,
    setActiveDescendant,
    onClose,
    { enablePageNavigation: true, selectOnSpaceAndTab },
  );

  useEffect(() => {
    if (!enabled || !open) {
      previousFilter.current = null;
      previousSelected.current = null;
      setActiveDescendant("");
      return;
    }

    const list = listRef.current;
    const highlighted =
      list?.querySelector<HTMLElement>(
        '[role="option"][data-has-focus="true"]',
      ) ?? undefined;
    const selected =
      list?.querySelector<HTMLElement>(
        '[role="option"][aria-selected="true"]:not([aria-disabled="true"])',
      ) ?? null;
    const current =
      highlighted?.getAttribute("aria-disabled") === "true"
        ? undefined
        : highlighted;
    const filterChanged =
      previousFilter.current !== filterText &&
      !(previousFilter.current === null && filterText === "");
    let next = current;

    // Async results may replace the highlighted option without changing the query.
    if (filterChanged || (filterText && !current)) {
      next =
        list?.querySelector<HTMLElement>(
          '[role="option"]:not([aria-disabled="true"])',
        ) ?? undefined;
    } else if (
      (!multiselect || !current) &&
      (selected !== previousSelected.current || !current)
    ) {
      next = selected ?? undefined;
    }

    previousFilter.current = filterText ?? null;
    previousSelected.current = selected;
    if (next !== highlighted) setFocus(next, highlighted);
    setActiveDescendant(next?.id ?? "");
  }, [enabled, open, filterText, rows, listRef, multiselect]);

  return { activeDescendant, handleKeyDown };
}

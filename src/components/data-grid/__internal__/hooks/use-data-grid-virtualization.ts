import { RefObject, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import {
  DATA_GRID_HEADER_HEIGHT,
  DATA_GRID_ROW_HEIGHT,
} from "../layout/data-grid.constants";
import { DataGridRowId } from "../../data-grid.types";

interface UseDataGridVirtualizationOptions {
  /** The total number of rows in the controlled collection. */
  rowCount: number;
  /** Returns a stable row identity so virtual items survive reordering. */
  getRowKey: (index: number) => DataGridRowId;
  /** The viewport observed for scrolling and visible row measurements. */
  scrollElementRef: RefObject<HTMLDivElement>;
  /** The viewport height constraint; virtualisation requires a defined height. */
  height?: number | string;
  /** Disables virtualisation even when the row count and height would enable it. */
  disabled: boolean;
  /** The number of additional rows rendered beyond each end of the visible range. */
  overscan: number;
}

const useDataGridVirtualization = ({
  rowCount,
  getRowKey,
  scrollElementRef,
  height,
  disabled,
  overscan,
}: UseDataGridVirtualizationOptions) => {
  const shouldVirtualize = !disabled && height !== undefined && rowCount > 20;
  const getScrollElement = useCallback(
    () => scrollElementRef.current,
    [scrollElementRef],
  );
  const virtualizer = useVirtualizer({
    count: rowCount,
    enabled: shouldVirtualize,
    estimateSize: () => DATA_GRID_ROW_HEIGHT,
    getItemKey: getRowKey,
    getScrollElement,
    overscan,
    paddingStart: DATA_GRID_HEADER_HEIGHT,
  });
  const virtualRows = virtualizer.getVirtualItems();
  const renderedRowIndexes = shouldVirtualize
    ? virtualRows.map(({ index }) => index)
    : Array.from({ length: rowCount }, (_, index) => index);
  const topPadding = shouldVirtualize
    ? Math.max(
        0,
        (virtualRows[0]?.start ?? DATA_GRID_HEADER_HEIGHT) -
          DATA_GRID_HEADER_HEIGHT,
      )
    : 0;
  const bottomPadding = shouldVirtualize
    ? Math.max(
        0,
        virtualizer.getTotalSize() -
          (virtualRows[virtualRows.length - 1]?.end ?? DATA_GRID_HEADER_HEIGHT),
      )
    : 0;

  return {
    renderedRowIndexes,
    topPadding,
    bottomPadding,
    renderToken: virtualRows,
  };
};

export default useDataGridVirtualization;

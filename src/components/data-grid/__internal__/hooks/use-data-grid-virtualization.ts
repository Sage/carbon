import { RefObject, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import {
  DATA_GRID_HEADER_HEIGHT,
  DATA_GRID_ROW_HEIGHT,
} from "../layout/data-grid.constants";
import { DataGridRowId } from "../../data-grid.types";

interface UseDataGridVirtualizationOptions {
  rowCount: number;
  getRowKey: (index: number) => DataGridRowId;
  scrollElementRef: RefObject<HTMLDivElement>;
  height?: number | string;
  disabled: boolean;
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

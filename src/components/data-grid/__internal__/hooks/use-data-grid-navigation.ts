import { RefObject, useCallback, useEffect, useRef, useState } from "react";

import { DataGridCellPosition, DataGridColumn } from "../../data-grid.types";
import { DataGridColumnModel } from "../layout/data-grid-column-model";
import {
  scrollColumnIntoView,
  scrollRowIntoView,
} from "../layout/data-grid.utils";

interface UseDataGridNavigationOptions<T extends object> {
  rowCount: number;
  columns: DataGridColumn<T>[];
  columnModel: DataGridColumnModel;
  scrollElementRef: RefObject<HTMLDivElement>;
  keyFor: (position: DataGridCellPosition) => string;
  renderToken: unknown;
}

const useDataGridNavigation = <T extends object>({
  rowCount,
  columns,
  columnModel,
  scrollElementRef,
  keyFor,
  renderToken,
}: UseDataGridNavigationOptions<T>) => {
  const [active, setActive] = useState<DataGridCellPosition>({
    row: 0,
    column: 0,
  });
  const cellRefs = useRef(new Map<string, HTMLDivElement>());
  const pendingFocus = useRef<DataGridCellPosition | null>(null);

  const registerCell = useCallback(
    (rowIndex: number, columnIndex: number, node: HTMLDivElement | null) => {
      const key = keyFor({ row: rowIndex, column: columnIndex });
      if (node) cellRefs.current.set(key, node);
      else cellRefs.current.delete(key);
    },
    [keyFor],
  );

  const ensureCellVisible = useCallback(
    (position: DataGridCellPosition) => {
      scrollColumnIntoView(
        scrollElementRef.current,
        columns,
        position.column,
        columnModel.leftStickyWidth,
        columnModel.rightStickyWidth,
      );
      scrollRowIntoView(scrollElementRef.current, position.row);
    },
    [columnModel, columns, scrollElementRef],
  );

  const focusCell = useCallback(
    (position: DataGridCellPosition) => {
      if (!rowCount || !columns.length) return;
      const next = {
        row: Math.max(0, Math.min(rowCount - 1, position.row)),
        column: Math.max(0, Math.min(columns.length - 1, position.column)),
      };

      setActive(next);
      ensureCellVisible(next);
      const cell = cellRefs.current.get(keyFor(next));
      if (cell) {
        cell.focus();
        pendingFocus.current = null;
      } else {
        pendingFocus.current = next;
      }
    },
    [columns.length, ensureCellVisible, keyFor, rowCount],
  );

  const moveLinear = useCallback(
    (position: DataGridCellPosition, delta: number) => {
      const index = position.row * columns.length + position.column + delta;
      const bounded = Math.max(
        0,
        Math.min(rowCount * columns.length - 1, index),
      );
      focusCell({
        row: Math.floor(bounded / columns.length),
        column: bounded % columns.length,
      });
    },
    [columns.length, focusCell, rowCount],
  );

  const focusAction = useCallback(
    (position: DataGridCellPosition) => {
      const action = cellRefs.current
        .get(keyFor(position))
        ?.querySelector<HTMLElement>("button,[href],[tabindex]");
      action?.focus();
      action?.click();
    },
    [keyFor],
  );

  useEffect(() => {
    const position = pendingFocus.current;
    if (!position) return;
    const cell = cellRefs.current.get(keyFor(position));
    if (cell) {
      cell.focus();
      pendingFocus.current = null;
    }
  }, [keyFor, renderToken]);

  return {
    active,
    activateCell: setActive,
    registerCell,
    ensureCellVisible,
    focusCell,
    moveLinear,
    focusAction,
  };
};

export default useDataGridNavigation;

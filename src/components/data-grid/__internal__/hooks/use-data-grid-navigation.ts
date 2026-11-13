import { RefObject, useCallback, useEffect, useRef, useState } from "react";

import {
  DataGridCellIdentity,
  DataGridCellPosition,
  DataGridColumn,
} from "../../data-grid.types";
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
  identityFor: (position: DataGridCellPosition) => DataGridCellIdentity;
  positionForIdentity: (
    identity: DataGridCellIdentity,
  ) => DataGridCellPosition | null;
  keyFor: (position: DataGridCellPosition) => string;
  renderToken: unknown;
  stickyHeader: boolean;
}

const useDataGridNavigation = <T extends object>({
  rowCount,
  columns,
  columnModel,
  scrollElementRef,
  identityFor,
  positionForIdentity,
  keyFor,
  renderToken,
  stickyHeader,
}: UseDataGridNavigationOptions<T>) => {
  const [activeIdentity, setActiveIdentity] =
    useState<DataGridCellIdentity | null>(null);
  const cellRefs = useRef(new Map<string, HTMLDivElement>());
  const pendingFocus = useRef<DataGridCellIdentity | null>(null);
  const active = activeIdentity
    ? (positionForIdentity(activeIdentity) ?? { row: 0, column: 0 })
    : { row: 0, column: 0 };

  const activateCell = useCallback(
    (position: DataGridCellPosition) => {
      setActiveIdentity(identityFor(position));
    },
    [identityFor],
  );

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
      scrollRowIntoView(scrollElementRef.current, position.row, stickyHeader);
    },
    [columnModel, columns, scrollElementRef, stickyHeader],
  );

  const focusCell = useCallback(
    (position: DataGridCellPosition) => {
      if (!rowCount || !columns.length) return;
      const next = {
        row: Math.max(0, Math.min(rowCount - 1, position.row)),
        column: Math.max(0, Math.min(columns.length - 1, position.column)),
      };

      const identity = identityFor(next);
      setActiveIdentity(identity);
      ensureCellVisible(next);
      const cell = cellRefs.current.get(keyFor(next));
      if (cell) {
        cell.focus();
        pendingFocus.current = null;
      } else {
        pendingFocus.current = identity;
      }
    },
    [columns.length, ensureCellVisible, identityFor, keyFor, rowCount],
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
    const identity = pendingFocus.current;
    if (!identity) return;
    const position = positionForIdentity(identity);
    if (!position) {
      pendingFocus.current = null;
      return;
    }
    const cell = cellRefs.current.get(keyFor(position));
    if (cell) {
      cell.focus();
      pendingFocus.current = null;
    }
  }, [keyFor, positionForIdentity, renderToken]);

  return {
    active,
    activateCell,
    registerCell,
    ensureCellVisible,
    focusCell,
    moveLinear,
    focusAction,
  };
};

export default useDataGridNavigation;

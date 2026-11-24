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
  /** The total number of rows, including rows outside the rendered range. */
  rowCount: number;
  /** The zero-based indexes of mounted rows available as navigation entry points. */
  renderedRowIndexes: number[];
  /** The column definitions in their displayed order. */
  columns: DataGridColumn<T>[];
  /** The column geometry used to scroll cells into view. */
  columnModel: DataGridColumnModel;
  /** The grid viewport whose scroll position is adjusted during navigation. */
  scrollElementRef: RefObject<HTMLDivElement>;
  /** Converts positional coordinates to a row ID and column field identity. */
  identityFor: (position: DataGridCellPosition) => DataGridCellIdentity;
  /** Finds an identity's current position, or null if its row or column was removed. */
  positionForIdentity: (
    identity: DataGridCellIdentity,
  ) => DataGridCellPosition | null;
  /** Produces the identity-based key used to register and retrieve mounted cells. */
  keyFor: (position: DataGridCellPosition) => string;
  /** Changes when the rendered row range changes so pending focus can be restored. */
  renderToken: unknown;
  /** Whether scrolling must leave room for the sticky header. */
  stickyHeader: boolean;
}

const useDataGridNavigation = <T extends object>({
  rowCount,
  renderedRowIndexes,
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
  const suspendedActionFocus = useRef<DataGridCellIdentity | null>(null);
  const focusedAction = useRef<DataGridCellIdentity | null>(null);
  const removedFocusedCell = useRef(false);
  const active = activeIdentity
    ? (positionForIdentity(activeIdentity) ?? { row: 0, column: 0 })
    : { row: 0, column: 0 };

  const activateCell = useCallback(
    (position: DataGridCellPosition) => {
      const identity = identityFor(position);
      focusedAction.current =
        columns[position.column]?.type === "action" ? identity : null;
      setActiveIdentity(identity);
    },
    [columns, identityFor],
  );

  const registerCell = useCallback(
    (rowIndex: number, columnIndex: number, node: HTMLDivElement | null) => {
      const key = keyFor({ row: rowIndex, column: columnIndex });
      if (node) cellRefs.current.set(key, node);
      else {
        const previous = cellRefs.current.get(key);
        if (previous === document.activeElement) {
          removedFocusedCell.current = true;
        } else if (
          focusedAction.current &&
          positionForIdentity(focusedAction.current)?.row === rowIndex &&
          focusedAction.current.field === columns[columnIndex]?.field
        ) {
          suspendedActionFocus.current = identityFor({
            row: rowIndex,
            column: columnIndex,
          });
        }
        cellRefs.current.delete(key);
      }
    },
    [columns, identityFor, keyFor, positionForIdentity],
  );

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      if (event.target === document.body) return;
      const identity = focusedAction.current ?? suspendedActionFocus.current;
      if (!identity) return;
      const position = positionForIdentity(identity);
      const cell = position && cellRefs.current.get(keyFor(position));
      if (!(event.target instanceof Node) || !cell?.contains(event.target)) {
        focusedAction.current = null;
        suspendedActionFocus.current = null;
      }
    };
    document.addEventListener("focusin", handleFocus);
    return () => document.removeEventListener("focusin", handleFocus);
  }, [keyFor, positionForIdentity]);

  const ensureCellVisible = useCallback(
    (position: DataGridCellPosition) => {
      scrollColumnIntoView(
        scrollElementRef.current,
        columns,
        position.column,
        columnModel.leftPinnedWidth,
        columnModel.rightPinnedWidth,
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

  useEffect(() => {
    const suspended = suspendedActionFocus.current;
    if (suspended) {
      const position = positionForIdentity(suspended);
      if (!position || document.activeElement !== document.body) {
        suspendedActionFocus.current = null;
      } else {
        const cell = cellRefs.current.get(keyFor(position));
        if (cell) {
          suspendedActionFocus.current = null;
          setActiveIdentity(suspended);
          cell.focus({ preventScroll: true });
          return;
        }
      }
    }
    if (pendingFocus.current || !renderedRowIndexes.length || !columns.length)
      return;
    if (!renderedRowIndexes.includes(active.row)) {
      const next = {
        row: renderedRowIndexes.reduce((nearest, row) =>
          Math.abs(row - active.row) < Math.abs(nearest - active.row)
            ? row
            : nearest,
        ),
        column: active.column,
      };
      setActiveIdentity(identityFor(next));
      if (
        removedFocusedCell.current &&
        document.activeElement === document.body
      ) {
        cellRefs.current.get(keyFor(next))?.focus({ preventScroll: true });
      }
    }
    removedFocusedCell.current = false;
  }, [
    active.column,
    active.row,
    columns.length,
    identityFor,
    keyFor,
    positionForIdentity,
    renderedRowIndexes,
  ]);

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

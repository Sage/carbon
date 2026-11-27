import React, { useCallback, useRef } from "react";

import {
  DataGridCellParams,
  DataGridCellPosition,
} from "../../data-grid.types";
import {
  getDataGridCellKeyAction,
  getDataGridEditorKeyAction,
} from "../keyboard/data-grid-keyboard";

interface UseDataGridKeyboardOptions<T extends object> {
  /** Whether Tab moves between cells rather than leaving the grid immediately. */
  enableTabNavigation: boolean;
  /** The total number of rows, including rows outside the rendered range. */
  rowCount: number;
  /** The number of navigable columns. */
  columnCount: number;
  /** Resolves cell metadata used to choose type-specific keyboard behaviour. */
  getCellParams: (position: DataGridCellPosition) => DataGridCellParams<T>;
  /** Activates a cell, scrolls it into view and moves focus to it. */
  focusCell: (position: DataGridCellPosition) => void;
  /** Moves focus by a signed cell offset, crossing row boundaries when needed. */
  moveLinear: (position: DataGridCellPosition, delta: number) => void;
  /** Moves focus to the interactive control within an action cell. */
  focusAction: (position: DataGridCellPosition) => void;
  /** Starts editing, optionally appending the character that initiated the edit. */
  beginEdit: (position: DataGridCellPosition, appendedText?: string) => void;
  /** Saves the draft and exits edit mode, optionally restoring cell focus. */
  commitEdit: (restoreFocus?: boolean) => void;
  /** Discards the draft and exits edit mode, optionally restoring cell focus. */
  cancelEdit: (restoreFocus?: boolean) => void;
}

const useDataGridKeyboard = <T extends object>({
  enableTabNavigation,
  rowCount,
  columnCount,
  getCellParams,
  focusCell,
  moveLinear,
  focusAction,
  beginEdit,
  commitEdit,
  cancelEdit,
}: UseDataGridKeyboardOptions<T>) => {
  const consumedEscape = useRef(false);
  const handleKeyDownCapture = useCallback(() => {
    consumedEscape.current = false;
  }, []);
  const handleCellKeyDown = useCallback(
    (event: React.KeyboardEvent, position: DataGridCellPosition) => {
      const cellType = getCellParams(position).column.type ?? "text";
      const action = getDataGridCellKeyAction(
        event,
        cellType,
        enableTabNavigation,
      );
      if (!action) return;
      if (
        action.type === "move-linear" &&
        (position.row * columnCount + position.column + action.delta < 0 ||
          position.row * columnCount + position.column + action.delta >=
            rowCount * columnCount)
      )
        return;

      event.preventDefault();
      switch (action.type) {
        case "move":
          cancelEdit();
          focusCell({
            row: position.row + action.rowDelta,
            column: position.column + action.columnDelta,
          });
          break;
        case "move-linear":
          cancelEdit();
          moveLinear(position, action.delta);
          break;
        case "move-to-row-edge":
          cancelEdit();
          focusCell({
            row: position.row,
            column: action.edge === "start" ? 0 : columnCount - 1,
          });
          break;
        case "move-to-grid-edge":
          cancelEdit();
          focusCell({
            row: action.edge === "start" ? 0 : rowCount - 1,
            column: action.edge === "start" ? 0 : columnCount - 1,
          });
          break;
        case "begin-edit":
          beginEdit(position, action.appendedText);
          break;
        case "toggle-checkbox":
          beginEdit(position);
          break;
        case "focus-action":
          focusAction(position);
          break;
      }
    },
    [
      beginEdit,
      cancelEdit,
      columnCount,
      enableTabNavigation,
      focusAction,
      focusCell,
      getCellParams,
      moveLinear,
      rowCount,
    ],
  );

  const handleEditorKeyDown = useCallback(
    (event: React.KeyboardEvent, position: DataGridCellPosition) => {
      // Editors are nested in gridcells; their keys must not also trigger the
      // navigation-mode handler on the parent cell.
      event.stopPropagation();
      const action = getDataGridEditorKeyAction(event, enableTabNavigation);
      if (!action) return;
      if (
        action.type === "commit-and-move" &&
        (position.row * columnCount + position.column + action.delta < 0 ||
          position.row * columnCount + position.column + action.delta >=
            rowCount * columnCount)
      )
        return;

      event.preventDefault();
      switch (action.type) {
        case "cancel":
          consumedEscape.current = true;
          cancelEdit(true);
          break;
        case "commit":
          commitEdit(true);
          break;
        case "commit-and-move":
          commitEdit();
          moveLinear(position, action.delta);
          break;
      }
    },
    [
      cancelEdit,
      columnCount,
      commitEdit,
      enableTabNavigation,
      moveLinear,
      rowCount,
    ],
  );

  const handleKeyUp = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Escape" && consumedEscape.current) {
      consumedEscape.current = false;
      event.stopPropagation();
    }
  }, []);

  return {
    handleCellKeyDown,
    handleEditorKeyDown,
    handleKeyDownCapture,
    handleKeyUp,
  };
};

export default useDataGridKeyboard;

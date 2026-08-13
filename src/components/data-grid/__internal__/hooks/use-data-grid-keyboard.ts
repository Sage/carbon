import React, { useCallback } from "react";

import {
  DataGridCellParams,
  DataGridCellPosition,
} from "../../data-grid.types";
import {
  getDataGridCellKeyAction,
  getDataGridEditorKeyAction,
} from "../keyboard/data-grid-keyboard";

interface UseDataGridKeyboardOptions<T extends object> {
  enableTabNavigation: boolean;
  getCellParams: (position: DataGridCellPosition) => DataGridCellParams<T>;
  focusCell: (position: DataGridCellPosition) => void;
  moveLinear: (position: DataGridCellPosition, delta: number) => void;
  focusAction: (position: DataGridCellPosition) => void;
  beginEdit: (position: DataGridCellPosition, initialValue?: unknown) => void;
  commitEdit: (restoreFocus?: boolean) => void;
  cancelEdit: (restoreFocus?: boolean) => void;
}

const useDataGridKeyboard = <T extends object>({
  enableTabNavigation,
  getCellParams,
  focusCell,
  moveLinear,
  focusAction,
  beginEdit,
  commitEdit,
  cancelEdit,
}: UseDataGridKeyboardOptions<T>) => {
  const handleCellKeyDown = useCallback(
    (event: React.KeyboardEvent, position: DataGridCellPosition) => {
      const cellType = getCellParams(position).column.type ?? "text";
      const action = getDataGridCellKeyAction(
        event,
        cellType,
        enableTabNavigation,
      );
      if (!action) return;

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
        case "begin-edit":
          beginEdit(position, action.initialValue);
          break;
        case "toggle-checkbox":
          beginEdit(position);
          break;
        case "focus-action":
          focusAction(position);
          break;
        default:
          break;
      }
    },
    [
      beginEdit,
      cancelEdit,
      enableTabNavigation,
      focusAction,
      focusCell,
      getCellParams,
      moveLinear,
    ],
  );

  const handleEditorKeyDown = useCallback(
    (event: React.KeyboardEvent, position: DataGridCellPosition) => {
      // Editors are nested in gridcells; their keys must not also trigger the
      // navigation-mode handler on the parent cell.
      event.stopPropagation();
      const action = getDataGridEditorKeyAction(event, enableTabNavigation);
      if (!action) return;

      event.preventDefault();
      switch (action.type) {
        case "cancel":
          cancelEdit(true);
          break;
        case "commit":
          commitEdit(true);
          break;
        case "commit-and-move":
          commitEdit();
          moveLinear(position, action.delta);
          break;
        default:
          break;
      }
    },
    [cancelEdit, commitEdit, enableTabNavigation, moveLinear],
  );

  return { handleCellKeyDown, handleEditorKeyDown };
};

export default useDataGridKeyboard;

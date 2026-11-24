import React, { memo } from "react";

import { StyledRow } from "../data-grid.style";
import DataGridCell from "../data-grid-cell";
import {
  DataGridCellParams,
  DataGridCellPosition,
  DataGridColumn,
} from "../../data-grid.types";

interface DataGridRowProps<T extends object> {
  /** The zero-based index of this row in the complete row collection. */
  rowIndex: number;
  /** The column definitions in their displayed order. */
  columns: DataGridColumn<T>[];
  /** The active column index in this row, or -1 when another row is active. */
  activeColumn: number;
  /** The edited column index in this row, or -1 when this row is not being edited. */
  editingColumn: number;
  /** The uncommitted value passed to this row's active editor. */
  draftValue?: unknown;
  /** Sticky offsets in pixels, keyed by zero-based column index. */
  pinnedOffsets: Map<number, number>;
  /** The CSS grid tracks shared by the header and body rows. */
  gridTemplateColumns: string;
  /** The active input ref used to manage editor focus and text selection. */
  editorRef: React.RefObject<HTMLInputElement>;
  /** Resolves the latest row, column and value for a cell position. */
  getParams: (position: DataGridCellPosition) => DataGridCellParams<T>;
  /** Resolves whether the row or column prevents a cell from being edited. */
  isReadOnly: (params: DataGridCellParams<T>) => boolean;
  /** Registers a mounted cell for focus management, or unregisters it when null. */
  registerCell: (
    rowIndex: number,
    columnIndex: number,
    node: HTMLDivElement | null,
  ) => void;
  /** Marks a cell as active without moving DOM focus. */
  onActivate: (position: DataGridCellPosition) => void;
  /** Activates a cell, scrolls it into view and moves focus to it. */
  onFocusPosition: (position: DataGridCellPosition) => void;
  /** Moves focus to the interactive control within an action cell. */
  onFocusAction: (position: DataGridCellPosition) => void;
  /** Starts editing the cell at the supplied position. */
  onBeginEdit: (position: DataGridCellPosition) => void;
  /** Updates the active editor's draft without committing it. */
  onDraftChange: (value: unknown) => void;
  /** Commits the draft or an explicit value, optionally restoring cell focus. */
  onCommitEdit: (shouldRestoreFocus?: boolean, value?: unknown) => void;
  /** Applies the commit-on-blur policy, optionally restoring cell focus. */
  onBlurEdit: (shouldRestoreFocus?: boolean) => void;
  /** Handles navigation and activation commands from a resting cell. */
  onCellKeyDown: (
    event: React.KeyboardEvent,
    position: DataGridCellPosition,
  ) => void;
  /** Handles committing, cancelling and navigating from the active editor. */
  onEditorKeyDown: (
    event: React.KeyboardEvent,
    position: DataGridCellPosition,
  ) => void;
}

const DataGridRowInner = <T extends object>({
  rowIndex,
  columns,
  activeColumn,
  editingColumn,
  draftValue,
  pinnedOffsets,
  gridTemplateColumns,
  editorRef,
  getParams,
  isReadOnly,
  registerCell,
  onActivate,
  onFocusPosition,
  onFocusAction,
  onBeginEdit,
  onDraftChange,
  onCommitEdit,
  onBlurEdit,
  onCellKeyDown,
  onEditorKeyDown,
}: DataGridRowProps<T>) => {
  const selectionColumnIndex = columns.findIndex(
    (column) => column.type === "checkbox" && column.selectsRow,
  );
  const isSelected =
    selectionColumnIndex >= 0 &&
    Boolean(getParams({ row: rowIndex, column: selectionColumnIndex }).value);

  return (
    <StyledRow
      role="row"
      aria-rowindex={rowIndex + 2}
      aria-selected={selectionColumnIndex >= 0 ? isSelected : undefined}
      data-component="data-grid-row"
      data-is-selected={isSelected}
      $gridTemplateColumns={gridTemplateColumns}
      $isSelected={isSelected}
    >
      {columns.map((column, columnIndex) => {
        const position = { row: rowIndex, column: columnIndex };
        const params = getParams(position);
        const supportsError =
          column.type !== "checkbox" && column.type !== "action";
        const errorValue = supportsError
          ? typeof column.error === "function"
            ? column.error(params)
            : column.error
          : undefined;

        return (
          <DataGridCell
            key={String(column.field)}
            params={params}
            position={position}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            active={activeColumn === columnIndex}
            editing={editingColumn === columnIndex}
            readOnly={isReadOnly(params)}
            errorValue={errorValue}
            draftValue={draftValue}
            pinnedOffset={pinnedOffsets.get(columnIndex)}
            hideInlineEndBorder={
              (column.pinned === "left" &&
                columns[columnIndex + 1]?.pinned !== "left") ||
              (column.pinned !== "right" &&
                columns[columnIndex + 1]?.pinned === "right")
            }
            editorRef={editorRef}
            ref={(node) => registerCell(rowIndex, columnIndex, node)}
            onActivate={onActivate}
            onFocusPosition={onFocusPosition}
            onFocusAction={onFocusAction}
            onBeginEdit={onBeginEdit}
            onDraftChange={onDraftChange}
            onCommitEdit={onCommitEdit}
            onBlurEdit={onBlurEdit}
            onCellKeyDown={onCellKeyDown}
            onEditorKeyDown={onEditorKeyDown}
          />
        );
      })}
    </StyledRow>
  );
};

const MemoizedDataGridRow = memo(DataGridRowInner);
MemoizedDataGridRow.displayName = "DataGridRow";

const DataGridRow = MemoizedDataGridRow as typeof DataGridRowInner;

export default DataGridRow;

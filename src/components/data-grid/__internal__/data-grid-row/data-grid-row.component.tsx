import React, { memo } from "react";

import { StyledRow } from "../data-grid.style";
import DataGridCell from "../data-grid-cell";
import {
  DataGridCellParams,
  DataGridCellPosition,
  DataGridColumn,
} from "../../data-grid.types";

interface DataGridRowProps<T extends object> {
  rowIndex: number;
  columns: DataGridColumn<T>[];
  activeColumn: number;
  editingColumn: number;
  draftValue?: unknown;
  stickyOffsets: Map<number, number>;
  gridTemplateColumns: string;
  editorRef: React.RefObject<HTMLInputElement | HTMLSelectElement>;
  getParams: (position: DataGridCellPosition) => DataGridCellParams<T>;
  isReadOnly: (params: DataGridCellParams<T>) => boolean;
  registerCell: (
    rowIndex: number,
    columnIndex: number,
    node: HTMLDivElement | null,
  ) => void;
  onActivate: (position: DataGridCellPosition) => void;
  onFocusPosition: (position: DataGridCellPosition) => void;
  onBeginEdit: (position: DataGridCellPosition) => void;
  onDraftChange: (value: unknown) => void;
  onCommitEdit: () => void;
  onCellKeyDown: (
    event: React.KeyboardEvent,
    position: DataGridCellPosition,
  ) => void;
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
  stickyOffsets,
  gridTemplateColumns,
  editorRef,
  getParams,
  isReadOnly,
  registerCell,
  onActivate,
  onFocusPosition,
  onBeginEdit,
  onDraftChange,
  onCommitEdit,
  onCellKeyDown,
  onEditorKeyDown,
}: DataGridRowProps<T>) => {
  const selectionColumnIndex = columns.findIndex(
    ({ type }) => type === "checkbox",
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
            stickyOffset={stickyOffsets.get(columnIndex)}
            editorRef={editorRef}
            ref={(node) => registerCell(rowIndex, columnIndex, node)}
            onActivate={onActivate}
            onFocusPosition={onFocusPosition}
            onBeginEdit={onBeginEdit}
            onDraftChange={onDraftChange}
            onCommitEdit={onCommitEdit}
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

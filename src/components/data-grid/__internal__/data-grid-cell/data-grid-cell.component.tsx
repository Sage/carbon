import React from "react";

import DataGridCellContent from "./data-grid-cell-content.component";
import DataGridCellEditor from "./data-grid-cell-editor.component";
import {
  DataGridCellParams,
  DataGridCellPosition,
} from "../../data-grid.types";
import { StyledCell } from "../data-grid.style";

interface DataGridCellProps<T extends object> {
  params: DataGridCellParams<T>;
  position: DataGridCellPosition;
  rowIndex: number;
  columnIndex: number;
  active: boolean;
  editing: boolean;
  readOnly: boolean;
  errorValue?: string | boolean;
  draftValue?: unknown;
  stickyOffset?: number;
  editorRef: React.RefObject<HTMLInputElement | HTMLSelectElement>;
  registerCell: (node: HTMLDivElement | null) => void;
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

const DataGridCell = <T extends object>({
  params,
  position,
  rowIndex,
  columnIndex,
  active,
  editing,
  readOnly,
  errorValue,
  draftValue,
  stickyOffset,
  editorRef,
  registerCell,
  onActivate,
  onFocusPosition,
  onBeginEdit,
  onDraftChange,
  onCommitEdit,
  onCellKeyDown,
  onEditorKeyDown,
}: DataGridCellProps<T>) => {
  const { column, rowId } = params;
  const type = column.type ?? "text";
  const errorText = typeof errorValue === "string" ? errorValue : undefined;

  return (
    <StyledCell
      ref={registerCell}
      role="gridcell"
      aria-colindex={columnIndex + 1}
      aria-readonly={readOnly || undefined}
      aria-invalid={!!errorValue || undefined}
      aria-label={errorText ? `${column.headerName}: ${errorText}` : undefined}
      tabIndex={active && !editing ? 0 : -1}
      cellType={type}
      width={column.width}
      minWidth={column.minWidth}
      flex={column.flex}
      sticky={column.sticky}
      stickyOffset={stickyOffset}
      hasError={!!errorValue}
      readOnly={readOnly}
      editing={editing}
      weight={column.weight ?? "regular"}
      onFocus={() => onActivate(position)}
      onClick={(event) => {
        if (!editing && type === "checkbox") {
          // A double click dispatches two click events. Toggle on the first so
          // checkbox cells retain normal single-click behaviour without being
          // immediately toggled back.
          if (event.detail > 1) return;
          onFocusPosition(position);
          if (!readOnly) onBeginEdit(position);
          return;
        }

        const target = event.target as HTMLElement;
        const interactiveTarget = target.closest(
          "button,a,input,select,textarea,[tabindex]",
        );
        if (
          !editing &&
          (!interactiveTarget || interactiveTarget === event.currentTarget)
        ) {
          onFocusPosition(position);
        }
      }}
      onDoubleClick={() => {
        if (type !== "checkbox") onBeginEdit(position);
      }}
      onKeyDown={(event) => onCellKeyDown(event, position)}
      data-component="data-grid-cell"
      data-element={`data-grid-cell-${String(rowId)}-${String(column.field)}`}
    >
      {editing && (type === "text" || type === "dropdown") ? (
        <DataGridCellEditor
          column={column}
          rowIndex={rowIndex}
          value={draftValue}
          editorRef={editorRef}
          onChange={onDraftChange}
          onBlur={onCommitEdit}
          onKeyDown={(event) => onEditorKeyDown(event, position)}
        />
      ) : (
        <DataGridCellContent params={params} rowIndex={rowIndex} />
      )}
    </StyledCell>
  );
};

export default DataGridCell;

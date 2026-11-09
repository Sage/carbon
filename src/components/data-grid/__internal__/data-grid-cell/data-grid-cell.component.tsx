import React, { forwardRef } from "react";

import DataGridCellContent from "./data-grid-cell-content.component";
import DataGridCellEditor from "./data-grid-cell-editor.component";
import {
  DataGridCellParams,
  DataGridCellPosition,
} from "../../data-grid.types";
import {
  StyledCell,
  StyledValidationBar,
  StyledVisuallyHidden,
} from "../data-grid.style";

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

const DataGridCellInner = <T extends object>(
  {
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
    onActivate,
    onFocusPosition,
    onBeginEdit,
    onDraftChange,
    onCommitEdit,
    onCellKeyDown,
    onEditorKeyDown,
  }: DataGridCellProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const { column, rowId } = params;
  const type = column.type ?? "text";
  const errorText = typeof errorValue === "string" ? errorValue : undefined;
  const errorId = errorText
    ? `data-grid-cell-error-${String(rowId)}-${String(column.field)}`
    : undefined;
  const align =
    column.align ??
    (type === "checkbox" || type === "action" ? "center" : "left");

  return (
    <StyledCell
      ref={ref}
      role="gridcell"
      aria-colindex={columnIndex + 1}
      aria-readonly={readOnly || undefined}
      aria-invalid={!!errorValue || undefined}
      aria-describedby={errorId}
      tabIndex={active && !editing ? 0 : -1}
      $cellType={type}
      $align={align}
      $sticky={column.sticky}
      $stickyOffset={stickyOffset}
      $hasError={!!errorValue}
      $readOnly={readOnly}
      $editing={editing}
      $weight={column.weight ?? "regular"}
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
      {!!errorValue && <StyledValidationBar aria-hidden="true" />}
      {errorText && (
        <StyledVisuallyHidden id={errorId}>{errorText}</StyledVisuallyHidden>
      )}
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
        <DataGridCellContent
          params={params}
          rowIndex={rowIndex}
          align={align}
        />
      )}
    </StyledCell>
  );
};

const ForwardedDataGridCell = forwardRef(DataGridCellInner);
ForwardedDataGridCell.displayName = "DataGridCell";

const DataGridCell = ForwardedDataGridCell as <T extends object>(
  props: DataGridCellProps<T> & {
    ref?: React.ForwardedRef<HTMLDivElement>;
  },
) => React.ReactElement;

export default DataGridCell;

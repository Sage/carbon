import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { createDataGridColumnModel } from "./__internal__/layout/data-grid-column-model";
import DataGridHeader from "./__internal__/data-grid-header";
import DataGridRow from "./__internal__/data-grid-row";
import {
  StyledDataGridViewport,
  StyledGrid,
  StyledSpacer,
} from "./__internal__/data-grid.style";
import useDataGridEditing from "./__internal__/hooks/use-data-grid-editing";
import useDataGridKeyboard from "./__internal__/hooks/use-data-grid-keyboard";
import useDataGridNavigation from "./__internal__/hooks/use-data-grid-navigation";
import useDataGridVirtualization from "./__internal__/hooks/use-data-grid-virtualization";
import {
  DataGridCellParams,
  DataGridCellPosition,
  DataGridHandle,
  DataGridProps,
  DataGridRowId,
} from "./data-grid.types";

export type {
  DataGridActionColumn,
  DataGridCellChangeParams,
  DataGridCellParams,
  DataGridCellType,
  DataGridCellWeight,
  DataGridCheckboxColumn,
  DataGridColumn,
  DataGridDropdownColumn,
  DataGridHandle,
  DataGridOption,
  DataGridProps,
  DataGridRowId,
  DataGridTextColumn,
} from "./data-grid.types";

const DataGridInner = <T extends object>(
  {
    rows,
    columns,
    "aria-label": ariaLabel,
    getRowId,
    onCellChange,
    enableTabNavigation = false,
    disableVirtualization = false,
    rowOverscan = 5,
    height,
    width,
  }: DataGridProps<T>,
  ref: React.ForwardedRef<DataGridHandle>,
) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowId = useCallback(
    (row: T) =>
      getRowId?.(row) ??
      ((row as T & { id: DataGridRowId }).id as DataGridRowId),
    [getRowId],
  );
  const keyFor = useCallback(
    (position: DataGridCellPosition) =>
      `${String(rowId(rows[position.row]))}:${String(columns[position.column].field)}`,
    [columns, rowId, rows],
  );
  const getCellParams = useCallback(
    (position: DataGridCellPosition): DataGridCellParams<T> => {
      const row = rows[position.row];
      const column = columns[position.column];
      const field = String(column.field);
      return {
        column,
        field,
        row,
        rowId: rowId(row),
        value: (row as Record<string, unknown>)[field],
      };
    },
    [columns, rowId, rows],
  );
  const isCellReadOnly = useCallback((params: DataGridCellParams<T>) => {
    const { readOnly } = params.column;
    return typeof readOnly === "function" ? readOnly(params) : !!readOnly;
  }, []);

  const columnModel = useMemo(
    () => createDataGridColumnModel(columns),
    [columns],
  );
  const getVirtualRowKey = useCallback(
    (index: number) => rowId(rows[index]),
    [rowId, rows],
  );
  const virtualization = useDataGridVirtualization({
    rowCount: rows.length,
    getRowKey: getVirtualRowKey,
    scrollElementRef: viewportRef,
    height,
    disabled: disableVirtualization,
    overscan: rowOverscan,
  });
  const {
    active,
    activateCell,
    registerCell,
    ensureCellVisible,
    focusCell: focusCellElement,
    moveLinear,
    focusAction,
  } = useDataGridNavigation({
    rowCount: rows.length,
    columns,
    columnModel,
    scrollElementRef: viewportRef,
    keyFor,
    renderToken: virtualization.renderToken,
  });
  const {
    editing,
    draftValue,
    editorRef,
    setDraftValue,
    beginEdit,
    commitEdit,
    cancelEdit,
  } = useDataGridEditing({
    getCellParams,
    isCellReadOnly,
    onCellChange,
    activateCell,
    ensureCellVisible,
    focusCell: focusCellElement,
    renderToken: virtualization.renderToken,
  });
  const focusCell = useCallback(
    (position: DataGridCellPosition) => {
      cancelEdit();
      focusCellElement(position);
    },
    [cancelEdit, focusCellElement],
  );
  const keyboard = useDataGridKeyboard({
    enableTabNavigation,
    getCellParams,
    focusCell,
    moveLinear,
    focusAction,
    beginEdit,
    commitEdit,
    cancelEdit,
  });

  useImperativeHandle(
    ref,
    () => ({
      focusCell(targetRowId, field) {
        const position = {
          row: rows.findIndex((row) => rowId(row) === targetRowId),
          column: columns.findIndex((column) => column.field === field),
        };
        if (position.row >= 0 && position.column >= 0) focusCell(position);
      },
      editCell(targetRowId, field) {
        const position = {
          row: rows.findIndex((row) => rowId(row) === targetRowId),
          column: columns.findIndex((column) => column.field === field),
        };
        if (position.row >= 0 && position.column >= 0) {
          beginEdit(position);
        }
      },
    }),
    [beginEdit, columns, focusCell, rowId, rows],
  );

  return (
    <StyledDataGridViewport
      ref={viewportRef}
      height={height}
      width={width}
      role="grid"
      aria-label={ariaLabel}
      aria-rowcount={rows.length + 1}
      aria-colcount={columns.length}
      data-component="data-grid-wrapper"
    >
      <StyledGrid contentWidth={columnModel.contentWidth}>
        <DataGridHeader
          columns={columns}
          stickyOffsets={columnModel.stickyOffsets}
          gridTemplateColumns={columnModel.gridTemplateColumns}
        />
        <div role="rowgroup" data-component="data-grid-body">
          {virtualization.topPadding > 0 && (
            <StyledSpacer
              role="presentation"
              height={virtualization.topPadding}
            />
          )}
          {virtualization.renderedRowIndexes.map((rowIndex) => (
            <DataGridRow
              key={rowId(rows[rowIndex])}
              rowIndex={rowIndex}
              columns={columns}
              activeColumn={active.row === rowIndex ? active.column : -1}
              editingColumn={editing?.row === rowIndex ? editing.column : -1}
              draftValue={editing?.row === rowIndex ? draftValue : undefined}
              stickyOffsets={columnModel.stickyOffsets}
              gridTemplateColumns={columnModel.gridTemplateColumns}
              editorRef={editorRef}
              getParams={getCellParams}
              isReadOnly={isCellReadOnly}
              registerCell={registerCell}
              onActivate={activateCell}
              onFocusPosition={focusCell}
              onBeginEdit={beginEdit}
              onDraftChange={setDraftValue}
              onCommitEdit={commitEdit}
              onCellKeyDown={keyboard.handleCellKeyDown}
              onEditorKeyDown={keyboard.handleEditorKeyDown}
            />
          ))}
          {virtualization.bottomPadding > 0 && (
            <StyledSpacer
              role="presentation"
              height={virtualization.bottomPadding}
            />
          )}
        </div>
      </StyledGrid>
    </StyledDataGridViewport>
  );
};

const ForwardedDataGrid = forwardRef(DataGridInner);
ForwardedDataGrid.displayName = "DataGrid";

export const DataGrid = ForwardedDataGrid as <T extends object>(
  props: DataGridProps<T> & { ref?: React.ForwardedRef<DataGridHandle> },
) => React.ReactElement;

export default DataGrid;

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
  StyledDataGridWrapper,
  StyledGrid,
  StyledSpacer,
} from "./__internal__/data-grid.style";
import useDataGridEditing from "./__internal__/hooks/use-data-grid-editing";
import useDataGridKeyboard from "./__internal__/hooks/use-data-grid-keyboard";
import useDataGridNavigation from "./__internal__/hooks/use-data-grid-navigation";
import useDataGridRows from "./__internal__/hooks/use-data-grid-rows";
import useDataGridVirtualization from "./__internal__/hooks/use-data-grid-virtualization";
import {
  DataGridCellIdentity,
  DataGridCellParams,
  DataGridCellPosition,
  DataGridHandle,
  DataGridProps,
  DataGridRowId,
} from "./data-grid.types";

export type {
  DataGridActionColumn,
  DataGridApi,
  DataGridCellParams,
  DataGridCellType,
  DataGridCellWeight,
  DataGridCheckboxColumn,
  DataGridColumn,
  DataGridDropdownColumn,
  DataGridHandle,
  DataGridOption,
  DataGridProps,
  DataGridRowChange,
  DataGridRowId,
  DataGridRowInsertion,
  DataGridTextColumn,
} from "./data-grid.types";

const DataGridInner = <T extends object>(
  {
    rows,
    columns,
    "aria-label": ariaLabel,
    getRowId,
    onRowsChange,
    enableTabNavigation = false,
    stickyHeader = false,
    disableVirtualization = false,
    rowOverscan = 5,
    maxHeight,
    maxWidth,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
  }: DataGridProps<T>,
  ref: React.ForwardedRef<DataGridHandle<T>>,
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
      JSON.stringify([
        typeof rowId(rows[position.row]),
        rowId(rows[position.row]),
        String(columns[position.column].field),
      ]),
    [columns, rowId, rows],
  );
  const identityFor = useCallback(
    (position: DataGridCellPosition): DataGridCellIdentity => ({
      rowId: rowId(rows[position.row]),
      field: String(columns[position.column].field),
    }),
    [columns, rowId, rows],
  );
  const positionForIdentity = useCallback(
    (identity: DataGridCellIdentity): DataGridCellPosition | null => {
      const position = {
        row: rows.findIndex((row) => rowId(row) === identity.rowId),
        column: columns.findIndex(
          (column) => String(column.field) === identity.field,
        ),
      };
      return position.row >= 0 && position.column >= 0 ? position : null;
    },
    [columns, rowId, rows],
  );
  const { api, commitCellChange } = useDataGridRows({
    rows,
    getRowId: rowId,
    onRowsChange,
  });
  const getCellParams = useCallback(
    (position: DataGridCellPosition): DataGridCellParams<T> => {
      const row = rows[position.row];
      const column = columns[position.column];
      const field = String(column.field);
      return {
        api,
        column,
        field,
        row,
        rowId: rowId(row),
        value: (row as Record<string, unknown>)[field],
      };
    },
    [api, columns, rowId, rows],
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
    height: maxHeight,
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
    identityFor,
    positionForIdentity,
    keyFor,
    renderToken: virtualization.renderToken,
    stickyHeader,
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
    onCellCommit: commitCellChange,
    identityFor,
    positionForIdentity,
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
      ...api,
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
    [api, beginEdit, columns, focusCell, rowId, rows],
  );

  return (
    <StyledDataGridWrapper
      data-component="data-grid-wrapper"
      data-role="data-grid-wrapper"
    >
      <StyledDataGridViewport
        ref={viewportRef}
        $maxHeight={maxHeight}
        $maxWidth={maxWidth}
        role="grid"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-rowcount={rows.length + 1}
        aria-colcount={columns.length}
        data-component="data-grid"
        data-role="data-grid"
        data-element="data-grid-scroll-container"
      >
        <StyledGrid $contentWidth={columnModel.contentWidth}>
          <DataGridHeader
            columns={columns}
            stickyOffsets={columnModel.stickyOffsets}
            gridTemplateColumns={columnModel.gridTemplateColumns}
            sticky={stickyHeader}
          />
          <div role="rowgroup" data-component="data-grid-body">
            {virtualization.topPadding > 0 && (
              <StyledSpacer
                role="presentation"
                $height={virtualization.topPadding}
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
                $height={virtualization.bottomPadding}
              />
            )}
          </div>
        </StyledGrid>
      </StyledDataGridViewport>
    </StyledDataGridWrapper>
  );
};

const ForwardedDataGrid = forwardRef(DataGridInner);
ForwardedDataGrid.displayName = "DataGrid";

export const DataGrid = ForwardedDataGrid as <T extends object>(
  props: DataGridProps<T> & { ref?: React.ForwardedRef<DataGridHandle<T>> },
) => React.ReactElement;

export default DataGrid;

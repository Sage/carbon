import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { createDataGridColumnModel } from "./__internal__/layout/data-grid-column-model";
import useColumnPlugins from "./__internal__/plugins/use-column-plugins";
import DataGridHeader from "./__internal__/data-grid-header";
import DataGridRow from "./__internal__/data-grid-row";
import {
  StyledDataGridViewport,
  StyledDataGridWrapper,
  StyledGrid,
  StyledSpacer,
  StyledVisuallyHidden,
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
  DataGridColumnLayout,
  DataGridResolvedColumn,
  DataGridSnapshot,
  DataGridPlugin,
  DataGridPluginApi,
  DataGridPluginProps,
  DataGridHeaderSlotProps,
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

const EMPTY_PLUGINS: readonly never[] = [];

const DataGridInner = <T extends object>(
  {
    rows,
    columns: definitions,
    plugins = EMPTY_PLUGINS,
    columnLayout,
    defaultColumnLayout,
    onColumnLayoutChange,
    "aria-label": ariaLabel,
    getRowId,
    onCellChange,
    enableTabNavigation = false,
    stickyHeader = false,
    disableVirtualization = false,
    rowOverscan = 5,
    maxHeight,
    maxWidth,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
  }: DataGridProps<T>,
  ref: React.ForwardedRef<DataGridHandle>,
) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const { columns, snapshot, api, headers, cells, announcement } =
    useColumnPlugins({
      definitions,
      plugins,
      columnLayout,
      defaultColumnLayout,
      onColumnLayoutChange,
      viewportRef,
    });
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
    keyFor,
    renderToken: virtualization.renderToken,
    stickyHeader,
  });
  const registerGridCell = useCallback(
    (rowIndex: number, columnIndex: number, node: HTMLDivElement | null) => {
      registerCell(rowIndex, columnIndex, node);
      if (!plugins.length) return;
      const field = String(columns[columnIndex].field);
      const id = rowId(rows[rowIndex]);
      if (node) {
        const columnCells =
          cells.current.get(field) ?? new Map<DataGridRowId, HTMLElement>();
        columnCells.set(id, node);
        cells.current.set(field, columnCells);
      } else {
        const columnCells = cells.current.get(field);
        columnCells?.delete(id);
        if (!columnCells?.size) cells.current.delete(field);
      }
    },
    [registerCell, columns, rowId, rows, cells, plugins.length],
  );
  const {
    editing,
    draftValue,
    editorRef,
    setDraftValue,
    beginEdit,
    commitEdit,
    cancelEdit,
  } = useDataGridEditing({
    columns,
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
    <StyledDataGridWrapper
      data-component="data-grid-wrapper"
      data-role="data-grid-wrapper"
    >
      {plugins.map(({ id, Controller }) =>
        Controller ? (
          <Controller key={id} api={api} snapshot={snapshot} />
        ) : null,
      )}
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
            plugins={plugins}
            api={api}
            snapshot={snapshot}
            headers={headers.current}
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
                registerCell={registerGridCell}
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
      {plugins.map(({ id, slots }) => {
        const Overlay = slots?.overlay;
        return Overlay ? (
          <Overlay key={id} api={api} snapshot={snapshot} />
        ) : null;
      })}
      {plugins.length > 0 && (
        <StyledVisuallyHidden aria-live="polite" aria-atomic="true">
          {announcement}
        </StyledVisuallyHidden>
      )}
    </StyledDataGridWrapper>
  );
};

const ForwardedDataGrid = forwardRef(DataGridInner);
ForwardedDataGrid.displayName = "DataGrid";

export const DataGrid = ForwardedDataGrid as <T extends object>(
  props: DataGridProps<T> & { ref?: React.ForwardedRef<DataGridHandle> },
) => React.ReactElement;

export default DataGrid;
